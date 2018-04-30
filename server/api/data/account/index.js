const router = require('express').Router()

const create = require('./create')
const read = require('./read/index')
const update = require('./update/index')
const remove = require('./delete/index')

router.use(create)
router.use(read)
router.use(update)
router.use(remove)

module.exports = router
