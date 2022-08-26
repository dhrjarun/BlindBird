import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm'
import { ObjectType, Field, Ctx, createUnionType } from 'type-graphql'
import Chat from './Chat'

import { registerEnumType } from 'type-graphql'

export enum Sender {
  FIRST_PERSON = 'firstPerson',
  SECOND_PERSON = 'secondPerson',
}

registerEnumType(Sender, {
  name: 'Sender',
})

@ObjectType()
@Entity()
export default class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @Column('boolean', { default: false })
  isSeen: boolean

  @Field()
  @Column('text')
  body: string

  @Field({ nullable: true })
  chatId?: number

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat

  @Field((type) => Sender)
  @Column({ type: 'enum', enum: Sender })
  sender: Sender
}
