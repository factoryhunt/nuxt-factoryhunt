const jwt = require('jsonwebtoken')
const config = require('../../api/.config')

//jwt Usage: jwt.sign(payload, secret, options, [callback])
exports.publishToken = (payload) => {
  const options = {
    // expiresIn: '7d', // default: null
    issuer: 'factoryhunt.com',
    subject: 'user_id'
  }
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwtSecret, options, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

exports.decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret,
      (err, decoded) => {
        if (err) reject(err)
        resolve(decoded)
      })
  })
}
