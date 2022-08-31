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
import { AuthenticationError, ForbiddenError } from 'apollo-server-core'

export enum CursorType {
  BEFORE = 'before',
  AFTER = 'after',
}

registerEnumType(CursorType, {
  name: 'CursorType',
})

@Resolver()
export class MessageResolver {
  @Authorized()
  @Query((returns) => [Message], { nullable: true })
  async messages(
    @Ctx() context: MyCtx,
    @Arg('chatId') chatId: number,
    @Arg('cursor', { nullable: true }) cursor: number,
    @Arg('cursorType', (type) => CursorType, { nullable: true })
    cursorType: CursorType,
    @Arg('limit', { nullable: true }) limit: number,
  ): Promise<Message[]> {
    const isAuthorized =
      (await dataSource
        .createQueryBuilder(Chat, 'chat')
        .leftJoinAndSelect('chat.firstPerson', 'firstPerson')
        .leftJoinAndSelect('chat.secondPerson', 'secondPerson')
        .where('chat.id = :chatId', { chatId })
        .andWhere('(firstPerson.id = :userId OR secondPerson.id = :userId)', {
          userId: context.req.user?.id,
        })
        .getCount()) !== 0

    if (!isAuthorized)
      throw new ForbiddenError("You don'n have access to this message")

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
  @Query(() => Message, { nullable: true })
  async message(@Arg('id', () => Number) id: number, @Ctx() context: MyCtx) {
    const msg = await dataSource
      .createQueryBuilder(Message, 'message')
      .leftJoin('message.chat', 'chat')
      .leftJoin('chat.firstPerson', 'firstPerson')
      .leftJoin('chat.secondPerson', 'secondPerson')
      .where(
        '(firstPerson.id = :userId OR secondPerson.id = :userId) AND message.id = :messageId',
        {
          messageId: id,
          userId: context.req.user?.id,
        },
      )
      .getOne()

    return msg
  }

  @Authorized()
  @Mutation((returns) => Message, { nullable: true })
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
      .andWhere('(firstPerson.id = :userId OR secondPerson.id = :userId)', {
        userId: context.req.user?.id,
      })
      .getOne()

    if (!chat) throw new ForbiddenError("You don't have access to this message")

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
      if (!context.user) throw new AuthenticationError('User need to signed in')
      return 'NEW_MESSAGE:' + context.user.id
    },
  })
  newMessage(@Root() message: Message): Message {
    return message
  }

  @Authorized()
  @Mutation((returns) => Boolean)
  async markSeen(@Arg('messageId') messageId: number, @Ctx() context: MyCtx) {
    const message = await dataSource
      .createQueryBuilder(Message, 'message')
      .leftJoin('message.chat', 'chat')
      .leftJoin('chat.firstPerson', 'firstPerson')
      .leftJoin('chat.secondPerson', 'secondPerson')
      .where(
        '((firstPerson.id = :userId AND message.sender = :sP) OR (secondPerson.id = :userId AND message.sender = :fP)) AND message.id = :messageId',
        {
          messageId,
          userId: context.req.user?.id,
          fP: Sender.FIRST_PERSON,
          sP: Sender.SECOND_PERSON,
        },
      )
      .getOne()

    if (!message) return false

    if (!message.isSeen) {
      message.isSeen = true
      await message.save()
      return true
    }

    return true
  }
}
