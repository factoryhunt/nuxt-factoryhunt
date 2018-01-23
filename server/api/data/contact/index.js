const router = require('express').Router()

const read = require('./read')
const update = require('./update')
const remove = require('./delete')

router.use(read)
router.use(update)
router.use(remove)

module.exports = router
