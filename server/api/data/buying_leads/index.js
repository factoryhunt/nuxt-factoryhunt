const router = require('express').Router()

const create = require('./create')
const read = require('./read')
const update = require('./update')
const remove = require('./delete')

router.use(create)
router.use(read)
router.use(update)
router.use(remove)

module.exports = router
