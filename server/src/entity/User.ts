import { ObjectType, Field } from 'type-graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import Chat from './Chat'

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column('varchar')
  name: string

  @Field()
  @Column('varchar', { unique: true })
  username: string

  @Field((type) => String)
  @Column('varchar', { nullable: true })
  email?: string | undefined

  @Field((type) => String)
  @Column('varchar', { nullable: true })
  photo?: string | undefined

  @OneToMany(() => Chat, (chat) => chat.owner)
  myChats: Chat[]

  @OneToMany(() => Chat, (chat) => chat.toer)
  yourChats: Chat[]
}
