// POST /api/data/product/editor/:account_id
module.exports = (req, res) => {
  const location = req.files[0].location
  res.status(200).json(location)
}
