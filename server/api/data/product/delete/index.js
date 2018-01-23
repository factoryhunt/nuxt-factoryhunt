const router = require('express').Router()

const _id = require('./_id')
const all = require('./all')

router.use(_id)
router.use('/all', all)

module.exports = router
