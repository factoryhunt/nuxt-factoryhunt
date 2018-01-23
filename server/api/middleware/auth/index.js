const jwt = require('jsonwebtoken')
const config = require('../../.config')

module.exports = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token

  // token does not exist
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in'
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

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    res.status(403).json({
      success: false,
      message: error.message
    })
  }

  try {
    const decoded = await decodeToken()
    req.decoded = decoded
    next()
  } catch (err) {
    onError(err)
  }
}
