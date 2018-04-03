// GET /api/auth/user_token
module.exports = async (req, res) => {
  const userToken = req.session.auth.token

  if (!userToken) {
    return res.status(403).json({msg: 'User session is expired.'})
  }

  res.status(200).json(userToken)
}
