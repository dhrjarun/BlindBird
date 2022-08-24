import {
  Resolver,
  Mutation,
  Query,
  Arg,
  Subscription,
  Root,
  PubSub,
  PubSubEngine,
  Authorized,
  Ctx,
  registerEnumType,
} from 'type-graphql'
import Message, { Sender } from '../../entity/Message'
import Chat from '../../entity/Chat'
import dataSource from '../../data-source'
import User from '../../entity/User'

export enum CursorType {
  BEFORE = 'before',
  AFTER = 'after',
}

registerEnumType(CursorType, {
  name: 'CursorType',
})

@Resolver()
export class MessageResolver {
  @Query((returns) => [Message])
  async messages(
    @Arg('chatId') chatId: number,
    @Arg('cursor', { nullable: true }) cursor: number,
    @Arg('cursorType', (type) => CursorType, { nullable: true })
    cursorType: CursorType,
    @Arg('limit', { nullable: true }) limit: number,
  ): Promise<Message[]> {
    const cursorString =
      cursorType === CursorType.AFTER ? 'message.id > :id' : 'message.id < :id'
    limit = limit ? limit : 12

    if (cursor) {
      return await dataSource
        .createQueryBuilder(Message, 'message')
        .where('message.chat.id = :chatId', { chatId })
        .andWhere(cursorString, { id: cursor })
        .orderBy({ 'message.createdAt': 'DESC' })
        .take(limit)
        .getMany()
    }
    return await dataSource
      .createQueryBuilder(Message, 'message')
      .where('message.chat.id = :chatId', { chatId })
      .orderBy({ 'message.createdAt': 'DESC' })
      .take(limit)
      .getMany()
  }

  @Authorized()
  @Mutation((returns) => Message)
  async createMessage(
    @Ctx() context: MyCtx,
    @Arg('chatId') chatId: number,
    @Arg('body') body: string,
    @PubSub() pubSub: PubSubEngine,
  ): Promise<Message> {
    let chat!: Chat | null

    chat = await dataSource
      .createQueryBuilder(Chat, 'chat')
      .leftJoinAndSelect('chat.firstPerson', 'firstPerson')
      .leftJoinAndSelect('chat.secondPerson', 'secondPerson')
      .select(['chat', 'firstPerson.id', 'secondPerson.id'])
      .where('chat.id = :chatId', { chatId })
      .getOne()

    if (!chat) return Promise.reject('No chat with this id in the database')

    const sender = new User()
    sender.id = context.req.user!.id
    sender.tId = context.req.user!.tId

    const isFirstPersonReciever = chat.secondPerson.id === sender.id
    let receiverId: number = isFirstPersonReciever
      ? chat.firstPerson.id
      : chat.secondPerson.id
    const receiver = new User()
    receiver.id = receiverId

    const message = new Message()
    message.chat = chat
    message.body = body
    message.sender = isFirstPersonReciever
      ? Sender.SECOND_PERSON
      : Sender.FIRST_PERSON

    await dataSource.manager.save(message)

    message.chatId = chat.id
    pubSub.publish('NEW_MESSAGE:' + receiverId, message)

    return message
  }

  @Subscription({
    topics: ({ context }) => {
      console.log('context', context.user)
      return 'NEW_MESSAGE:' + context.user?.id
    },
  })
  newMessage(@Root() message: Message): Message {
    return message
  }

  @Authorized()
  @Mutation((returns) => Boolean)
  async makeSeen(@Arg('messageId') messageId: number, @Ctx() context: MyCtx) {
    const result = await dataSource
      .createQueryBuilder()
      .update(Message)
      .set({ isSeen: true })
      .where('id = :messageId', { messageId })
      .execute()
    if (result.affected === 1) return true
    return false
  }
}
