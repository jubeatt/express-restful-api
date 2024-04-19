import { Options } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const config: Options = {
  dialect: 'mysql',
  host: process.env.HOST || process.env.MYSQL_HOST,
  database: process.env.DATABASE || process.env.MYSQL_DATABASE,
  username: process.env.USERNAME || process.env.MYSQL_USERNAME,
  password: process.env.PASSWORD || process.env.MYSQL_PASSWORD,
  // @ts-ignore
  port: process.env.DB_PORT || process.env.MYSQL_PORT
}
