// POST /api/data/account/image/:account_id
module.exports = (req, res) => {
  const key = Object.keys(req.files)[0]
  if (!key) res.status(403).json({})

  const value = req.files[key]
  const file = value[0]

  res.status(200).json(file)
}
