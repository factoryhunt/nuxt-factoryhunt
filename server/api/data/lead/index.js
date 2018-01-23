const router = require('express').Router()

const read = require('./read/index')

router.use(read)

module.exports = router
