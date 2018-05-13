const router = require('express').Router()

const read = require('./read')

router.use(read)

module.exports = router
