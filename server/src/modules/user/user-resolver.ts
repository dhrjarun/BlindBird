import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import dataSource from '../../data-source'
import User from '../../entity/User'
import { logout } from './logout'

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: MyCtx) {
    const user = await dataSource
      .createQueryBuilder(User, 'user')
      .select('user')
      .where('user.id = :id', { id: context.req?.user?.id })
      .getOne()

    await user?.populateTwtPfpByTId()

    return user
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() context: MyCtx) {
    return logout(context.req, context.res)
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('tUsername') tUsername: string) {
    const user = new User()
    if (!(await user.populateTwtPfpByTUsername(tUsername))) return null

    const userCount = await dataSource
      .createQueryBuilder(User, 'user')
      .select('user')
      .where('user.tId = :tId', { tId: user.tId })
      .getCount()

    if (userCount !== 0) user.isRegistered = true
    else user.isRegistered = false

    return user
  }
}
