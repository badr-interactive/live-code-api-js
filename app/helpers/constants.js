/** @module helpers/constant */

/**
 * Constant value for user role
 * @export
 * @constant USER_ROLE
 */
export const USER_ROLE = {
  ADMIN: 1,
  USER: 2,
}

/**
 * get key constant from value
 *
 * @export
 * @param {object} object
 * @param {string} value
 * @return {string}
 */
export function getLabelByKey(object, value) {
  let key = ''
  key = Object.keys(object).find((idx) => object[idx] === value)
  if (key) {
    key = key.replace('_', ' ')
  }
  return key
}
