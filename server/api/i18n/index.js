const router = require('express').Router()

router.post('/', (req, res) => {
  const { locale } = req.body
  req.session.locale = locale
  res.status(200).json({result: true})
})

router.delete('/', (req, res) => {
  delete req.session.locale
  res.status(200).json({result: true})
})

module.exports = router
