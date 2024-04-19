import { Sequelize } from 'sequelize'
import { config } from '../config/config'
import { readdirSync } from 'fs'
import { basename, join } from 'path'
import initializeBookModel from './book'

type Model = {
  Book: ReturnType<typeof initializeBookModel>
}

const thisFile = basename(__filename)
const db = new Sequelize(config)

// @ts-ignore
const models: Model = {}

readdirSync(__dirname)
  .filter((file) => file.includes('.') && file !== thisFile)
  .forEach((file) => {
    const absolutePath = join(__dirname, file)
    const initializeModel = require(absolutePath).default
    const model = initializeModel(db)
    // @ts-ignore
    models[model.name] = model
  })

export { models }
