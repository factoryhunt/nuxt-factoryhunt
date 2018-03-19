const router = require('express').Router()

const _ = require('./_')

// Middlewares
const multer = require('./middleware/multer')

const fields = [
  {name: 'logo'},
  {name: 'cover_0'},
  {name: 'cover_1'},
  {name: 'cover_2'},
  {name: 'cover_3'},
  {name: 'cover_4'},
  {name: 'cover_5'},
  {name: 'cover_6'},
  {name: 'cover_7'},
]

router.put('/:account_id', multer.fields(fields), _)

module.exports = router
