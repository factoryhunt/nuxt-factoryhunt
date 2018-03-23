const router = require('express').Router()

const read = require('./read/index')
const update = require('./update/index')

router.use(read)
router.use(update)

module.exports = router
