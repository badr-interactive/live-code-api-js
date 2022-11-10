/**
 * @module models/index
 *
 *
* */

/**
 * get object from models sequelize
 * @returns {object} - sequelize object
 * @default
 * @memberof models/index
 */

import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import cfg from '../../config/database'
import listModels from './models'

dotenv.config()

const env = process.env.NODE_ENV || 'development'
const config = cfg[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}
// sequelize.hooks = hooks
Object.keys(listModels).forEach((key) => {
  const model = listModels[key](sequelize, Sequelize.DataTypes)
  db[model.name] = model
})

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
