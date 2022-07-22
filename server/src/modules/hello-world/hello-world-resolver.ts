import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello world'
  }
}
