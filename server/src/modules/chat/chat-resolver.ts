import { Resolver, Mutation, Query, Arg, Ctx, Authorized } from 'type-graphql'
import Chat from '../../entity/Chat'
import User from '../../entity/User'
import dataSource from '../../data-source'
import { Sender } from '../../entity/Message'

@Resolver()
export class ChatResolver {
  @Mutation(() => Chat)
  @Authorized()
  async createChat(
    @Ctx() context: MyCtx,
    @Arg('name') name: string,
    @Arg('secondPersonTId') secondPersonTId: string,
    @Arg('revealGender') revealGender: boolean = false,
  ): Promise<Chat> {
    const firstPerson = new User()
    firstPerson.id = context.req.user!.id
    firstPerson.tId = context.req.user!.tId

    const secondPerson = await dataSource
      .createQueryBuilder(User, 'user')
      .select('user')
      .where('user.tId = :secondPersonTId', { secondPersonTId })
      .getOne()

    if (!secondPerson)
      return Promise.reject('secondPerson is not in the database')

    const chat = new Chat()
    chat.name = name
    chat.revealGender = revealGender
    chat.firstPerson = firstPerson
    chat.secondPerson = secondPerson

    await dataSource.manager.save(chat)
    return chat
  }

  @Query((returns) => [Chat], { nullable: true })
  @Authorized()
  async chats(@Ctx() context: MyCtx) {
    return await dataSource
      .createQueryBuilder(Chat, 'chat')
      .leftJoinAndSelect('chat.firstPerson', 'firstPerson')
      .leftJoinAndSelect('chat.secondPerson', 'secondPerson')
      .where('chat.firstPerson.id = :id OR chat.secondPerson.id = :id', {
        id: context.req.user!.id,
      })
      .getMany()
  }

  @Query((returns) => Chat, { nullable: true })
  @Authorized()
  async chat(
    @Arg('id') id: number,
    @Ctx() context: MyCtx,
  ): Promise<Chat | null> {
    return await dataSource
      .createQueryBuilder(Chat, 'chat')
      .leftJoinAndSelect('chat.firstPerson', 'firstPerson')
      .leftJoinAndSelect('chat.secondPerson', 'secondPerson')
      .where(
        'chat.id = :chatId AND (chat.firstPerson.id = :userId OR chat.secondPerson.id = :userId)',
        {
          userId: context.req.user!.id,
          chatId: id,
        },
      )
      .select(['chat', 'firstPerson', 'secondPerson'])
      .getOne()
  }

  @Authorized()
  @Query((returns) => [Chat], { nullable: true })
  async chatsWithUnreadMsgs(@Ctx() context: MyCtx): Promise<Chat[]> {
    return await dataSource
      .createQueryBuilder(Chat, 'chat')
      .leftJoinAndSelect('chat.firstPerson', 'firstPerson')
      .leftJoinAndSelect('chat.secondPerson', 'secondPerson')
      .leftJoinAndSelect(
        'chat.messages',
        'message',
        'message.isSeen = false AND ((chat.firstPerson.id = :userId AND message.sender = :sP) OR (chat.secondPerson.id = :userId AND message.sender = :fP))',
        {
          userId: context.req.user?.id,
          fP: Sender.FIRST_PERSON,
          sP: Sender.SECOND_PERSON,
        },
      )
      .select(['chat', 'firstPerson', 'secondPerson', 'message'])
      .orderBy({ 'message.createdAt': 'DESC' })
      .getMany()
  }

  @Authorized()
  @Query((returns) => Chat, { nullable: true })
  async chatWithUnreadMsgs(
    @Arg('id') id: number,
    @Ctx() context: MyCtx,
  ): Promise<Chat | null> {
    return await dataSource
      .createQueryBuilder(Chat, 'chat')
      .leftJoinAndSelect('chat.firstPerson', 'firstPerson')
      .leftJoinAndSelect('chat.secondPerson', 'secondPerson')
      .leftJoinAndSelect(
        'chat.messages',
        'message',
        'message.isSeen = false AND ((chat.firstPerson.id = :userId AND message.sender = :sP) OR (chat.secondPerson.id = :userId AND message.sender = :fP))',
        {
          userId: context.req.user?.id,
          fP: Sender.FIRST_PERSON,
          sP: Sender.SECOND_PERSON,
        },
      )
      .where('chat.id = :chatId', {
        chatId: id,
      })
      .select(['chat', 'firstPerson', 'secondPerson', 'message'])
      .orderBy({ 'message.createdAt': 'DESC' })
      .getOne()
  }
}
