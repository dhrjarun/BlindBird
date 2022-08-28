import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import dataSource from '../../data-source'
import User from '../../entity/User'

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User)
  async me(@Ctx() context: MyCtx) {
    const user = await dataSource
      .createQueryBuilder(User, 'user')
      .select('user')
      .where('user.id = :id', { id: context.req.user!.id })
      .getOne()

    await user?.populateTwtPfpByTId()

    return user
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
