import { DataSource } from 'typeorm'
import User from './entity/User'
import Chat from './entity/Chat'
import Message from './entity/Message'

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Chat, Message],
  subscribers: [],
  migrations: [],
})
