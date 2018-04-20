const router = require('express').Router()

const featured = require('./featured')
const _id = require('./_id')
const domain = require('./domain')

router.use('/featured', featured)
router.use(_id)
router.use('/domain', domain)

module.exports = router
