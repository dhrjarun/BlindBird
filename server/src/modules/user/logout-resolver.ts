import { Ctx, Mutation, Resolver } from 'type-graphql'

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() ctx: MyCtx): Promise<boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.logout((err) => {
        if (err) {
          reject(false)
        } else {
          ctx.res.clearCookie('userId')
          resolve(true)
        }
      })
    })
  }
}
