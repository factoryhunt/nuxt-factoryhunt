const router = require('express').Router()

// Routes
const _ = require('./_')

// Middlewares
const product_create = require('./middleware/product_create')
const config_multer = require('./middleware/multer')

// Configs
const fields = [
  {name: 'images'},
  {name: 'pdf'}
]

router.post('/:account_id', product_create, config_multer.fields(fields), _)

module.exports = router
