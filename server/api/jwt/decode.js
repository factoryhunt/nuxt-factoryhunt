const { decodeToken } = require('../../utils/jwt')

// POST /api/token/decode
module.exports = async (req, res) => {
  const token = req.body.token

  try {
    const decoded = await decodeToken(token)
    res.status(200).json(decoded)
  } catch (err) {
    console.log('decode token error\n', err)
    res.status(403).json({ result: false })
  }
}
