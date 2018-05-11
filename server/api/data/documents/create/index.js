// POST /api/data/documents/:parent_id
module.exports = (req, res) => {
  const { parent_id } = req.params
  const { file } = req
  console.log('file is:', file)
  res.status(200).json({ result: `id:${parent_id} documents created.` })
}
