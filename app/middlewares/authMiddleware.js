/**
 * @module middlewares/authMiddleware
 *
 *
 * @requires jsonwebtoken
 * @requires helpers/errorResponse
 * @requires models
 *
*/

import jwt from 'jsonwebtoken'
import errorResponse from '../helpers/errorResponse'
import models from '../models'

const { User } = models

/**
 * check is have any user authenticate from token, save user data in request
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {any}
 */
export function isAuthenticate(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json(errorResponse('Unauthorized'))
    return
  }

  const splitToken = req.headers.authorization.split(' ')
  if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
    res.status(400).json(errorResponse('Wrong authorization format'))
    return
  }

  jwt.verify(splitToken[1], process.env.SECRET, { algorithms: ['HS256'] }, async (err, payload) => {
    if (err && err.name === 'TokenExpiredError') {
      res.status(401).json(errorResponse('Expired Token'))
    } else if (err) {
      res.status(401).json(errorResponse('Invalid Token'))
    } else {
      try {
        const user = await User.findOne({
          where: {
            id: payload.id,
          },
        })

        if (!user) {
          res.status(401).json(errorResponse('Invalid Token'))
          return
        }

        req.user = user
        next()
      } catch (error) {
        next(error)
      }
    }
  })
}
