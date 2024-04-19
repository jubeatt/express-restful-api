import express from 'express'
import dotenv from 'dotenv'
import { bookController } from './controllers/bookController'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/books', bookController.list)
app.get('/books/:id', bookController.findById)
app.post('/books', bookController.add)
app.delete('/books/:id', bookController.deleteById)

app.listen(port, () => {
  console.log('Server start running')
})
