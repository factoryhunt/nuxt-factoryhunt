const router = require('express').Router()

const featured = require('./featured')
const domain = require('./domain')
const _id = require('./_id')

router.use('/featured', featured)
router.use('/domain', domain)
router.use(_id)

module.exports = router
