import { ObjectType, Field, Int } from 'type-graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Index,
  CreateDateColumn,
  AfterLoad,
} from 'typeorm'
import Chat from './Chat'
import { twtApi } from '../twt-api'
import { UsersV2Params, UserV2 } from 'twitter-api-v2'
@ObjectType()
class PublicMetrics {
  @Field((type) => Int)
  followersCount?: number

  @Field((type) => Int)
  followingCount?: number

  @Field((type) => Int)
  tweetCount?: number

  @Field((type) => Int)
  listedCount?: number
}

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @AfterLoad()
  async afterLoad() {
    if (this.tId) {
      if (this.tName && this.tUsername) return
      await this.populateTwtPfpByTId()
    }
  }

  async populateTwtPfpByTId(tId = this.tId) {
    if (!tId) return false

    const { data } = await twtApi.v2.user(tId, User.twtUserApiOptions)

    this.mapTwtProperties(data)

    return true
  }

  async populateTwtPfpByTUsername(tUsername = this.tUsername) {
    if (!tUsername) return false

    const { data } = await twtApi.v2.userByUsername(
      tUsername,
      User.twtUserApiOptions,
    )

    this.mapTwtProperties(data)

    return true
  }

  private static twtUserApiOptions: Partial<UsersV2Params> = {
    'user.fields': [
      'profile_image_url',
      'name',
      'username',
      'entities',
      'public_metrics',
    ],
  }

  private mapTwtProperties(data: UserV2) {
    this.tId = data.id
    this.tUsername = data.username
    this.tPfp = data.profile_image_url
    this.tName = data.name
    this.publicMetrics = {
      followersCount: data.public_metrics?.followers_count,
      followingCount: data.public_metrics?.following_count,
      tweetCount: data.public_metrics?.tweet_count,
      listedCount: data.public_metrics?.listed_count,
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Field({ nullable: true })
  @CreateDateColumn()
  createAt: Date

  @Field((type) => String)
  @Index({ unique: true })
  @Column('varchar')
  tId: string | null

  @Field()
  tName: string

  @Field()
  tUsername: string

  @Field((type) => String, { nullable: true })
  tPfp?: string | undefined

  @OneToMany(() => Chat, (chat) => chat.firstPerson)
  myChats: Chat[]

  @OneToMany(() => Chat, (chat) => chat.secondPerson)
  yourChats: Chat[]

  @Field((type) => PublicMetrics, { nullable: true })
  publicMetrics: PublicMetrics

  @Field((type) => Boolean, { nullable: true })
  isRegistered: boolean
}
