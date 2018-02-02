const mysql = require('../../mysql/index')
const CONFIG_MYSQL = require('../../mysql/model')
const jwt = require('jsonwebtoken')
const config = require('../../.config')

module.exports = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token

  // token does not exist
  if (!token) {
    return res.status(403).json({
      result: false,
      message: 'Not logged in'
    })
  }

  // create a promise that decodes the token
  const decodeToken = () => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) reject(err)
        resolve(decoded)
      })
    })
  }

  const getAccountData = (account_id) => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE account_id = ${account_id}`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0])
      })
    })
  }

  const getContactData = (contact_id) => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT contact_id, contact_email, contact_level, contact_mobile, contact_phone, contact_phone_ext, contact_title, created_date, first_name, first_name_english, last_name, last_name_english, lead_source, management_level, notes, salutation FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE contact_id = ${contact_id}`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0])
      })
    })
  }

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    res.status(403).json({
      result: false,
      message: error.message
    })
  }

  try {
    const { account_id, contact_id } = await decodeToken()
    const promise = await Promise.all([
      getAccountData(account_id),
      getContactData(contact_id)
    ])
    req.user = {
      account: promise[0],
      contact: promise[1]
    }
    next()
  } catch (err) {
    onError(err)
  }
}