import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import User from './User'
import Message from './Message'

@ObjectType()
@Entity()
export default class Chat extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column('varchar', { nullable: true })
  name: string

  @Field()
  @Column('boolean', { default: false })
  revealGender: boolean

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[]

  @ManyToOne(() => User, (user) => user.myChats)
  owner: User

  @ManyToOne(() => User, (user) => user.yourChats)
  toer: User
}
