import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import Chat from './Chat'

@ObjectType()
@Entity()
export default class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column('date')
  createdAt: Date

  @Field()
  @Column('boolean')
  isSeen: boolean

  @Field()
  @Column('text')
  body: string

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat
}
