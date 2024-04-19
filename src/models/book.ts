import { CreationOptional, InferAttributes, InferCreationAttributes, Model, Sequelize, DataTypes } from 'sequelize'

class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
  declare id: CreationOptional<number>
  declare name: string
}

const initializeModel = (sequelize: Sequelize) => {
  return Book.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      }
    },
    { sequelize, tableName: 'books' }
  )
}

export default initializeModel
