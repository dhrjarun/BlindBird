import { Resolver, Mutation, Query, Arg, Ctx, Authorized } from 'type-graphql'
import Chat from '../../entity/Chat'
import User from '../../entity/User'
import dataSource from '../../data-source'

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

  @Query((returns) => [Chat])
  @Authorized()
  async chats(@Ctx() context: MyCtx) {
    const chat = await dataSource
      .createQueryBuilder(Chat, 'chat')
      .leftJoinAndSelect('chat.firstPerson', 'firstPerson')
      .leftJoinAndSelect('chat.secondPerson', 'secondPerson')
      .where('chat.firstPerson.id = :id OR chat.secondPerson.id = :id', {
        id: context.req.user!.id,
      })
      .getMany()

    return chat
  }
}
