const router = require('express').Router()

// Routes
const _ = require('./_')

// Middlewares
const multer = require('./middleware/multer')



router.post('/:contact_id', multer.array('images', 1), _)

module.exports = router
