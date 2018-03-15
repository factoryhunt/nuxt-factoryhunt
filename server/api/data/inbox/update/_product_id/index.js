const router = require('express').Router()

// Routes
const _ = require('./_')

// Middlewares
const config_multer = require('./middleware/multer')

//
const fields = [
  {name: 'image_1'},
  {name: 'image_2'},
  {name: 'image_3'},
  {name: 'image_4'},
  {name: 'image_5'},
  {name: 'pdf'}
]

router.put('/:product_id', config_multer.fields(fields), _)

module.exports = router
