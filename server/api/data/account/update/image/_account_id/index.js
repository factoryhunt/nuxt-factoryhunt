const router = require('express').Router()

const _ = require('./_')

// Middlewares
const multer = require('./middleware/multer')

router.put('/:account_id', multer.array('image', 1), _)

module.exports = router
