import { Request, Response } from 'express'
import { models } from '../models'
import { Book, ErrorResponse } from '../types/global'
import {
  Record_Update_Successfully,
  Specify_Resource_Is_Not_Found,
  System_Internal_Error
} from '../constants/constants'

export const bookController = {
  list: async (req: Request, res: Response<Book[] | ErrorResponse>) => {
    try {
      const books = await models.Book.findAll()
      const result: Book[] = []
      for (const book of books) {
        result.push({
          id: book.dataValues.id,
          name: book.dataValues.name
        })
      }
      res.send(result)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: System_Internal_Error,
        timestamp: new Date().toISOString()
      })
    }
  },
  add: async (req: Request<{}, {}, Book>, res: Response<Book | ErrorResponse>) => {
    if (!Boolean(req.body.name)) {
      res.status(400).send({
        message: 'name cannot be blank.',
        timestamp: new Date().toISOString()
      })
      return
    }
    try {
      const result = await models.Book.create({ name: req.body.name })
      res.send(result)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: System_Internal_Error,
        timestamp: new Date().toISOString()
      })
    }
  },
  findById: async (req: Request<{ id: string }>, res: Response<Book | ErrorResponse>) => {
    try {
      const book = await models.Book.findByPk(req.params.id)
      if (!book) {
        res.status(500).send({
          message: Specify_Resource_Is_Not_Found,
          timestamp: new Date().toISOString()
        })
        return
      }
      res.send({
        id: book.id,
        name: book.name
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: System_Internal_Error,
        timestamp: new Date().toISOString()
      })
    }
  },

  deleteById: async (req: Request<{ id: string }>, res: Response<Book | ErrorResponse>) => {
    try {
      const deletedRows = await models.Book.destroy({ where: { id: req.params.id } })
      if (deletedRows > 0) {
        res.send({
          message: Record_Update_Successfully,
          timestamp: new Date().toISOString()
        })
      } else {
        res.status(400).send({
          message: Specify_Resource_Is_Not_Found,
          timestamp: new Date().toISOString()
        })
      }
    } catch (error) {
      res.status(500).send({
        message: System_Internal_Error,
        timestamp: new Date().toISOString()
      })
    }
  }
}
