import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  Index,
  CreateDateColumn,
} from 'typeorm'
import { ObjectType, Field, Authorized } from 'type-graphql'
import User from './User'
import Message from './Message'

@ObjectType()
@Entity()
@Index(['firstPerson', 'secondPerson'], { unique: true })
export default class Chat extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column('varchar', { nullable: true })
  name: string

  @Field()
  @CreateDateColumn()
  createAt: Date

  @Field()
  @Column('boolean', { default: false })
  revealGender: boolean

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[]

  @Authorized('firstPerson')
  @Field((type) => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.myChats)
  firstPerson: User

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.yourChats)
  secondPerson: User
}
