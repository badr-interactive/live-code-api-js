import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'Starterkit API' })
})

/**
 * @typedef Error
 * @property {string} message - message - eg:message error
 *
 */

/**
 * @typedef ErrorValidation
 * @property {string} message - message - eg:Unprocessable Entity
 * @property {ErrorFields.model} errors - errors - eg:field tidak boleh kosong
 *
 */

/**
 * @typedef ErrorFields
 * @property {Array.<string>} field_1 - field - eg:["field tidak boleh kosong"]
 * @property {Array.<string>} field_2 - field - eg:["field tidak boleh kosong"]
 * @property {Array.<string>} field_n - field - eg:["field tidak boleh kosong"]
 *
 */

/**
 * @typedef PaginateResponse
 * @property {string} total - total - eg:20
 * @property {string} page - page - eg:1
 * @property {string} perPage - perPage - eg:10
 * @property {Array.<object>} list - list
 *
 */

export default router
