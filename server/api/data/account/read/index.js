const router = require('express').Router()

const featured = require('./featured')
const domain = require('./domain')
const check_domain = require('./check_domain')
const _id = require('./_id')

router.use('/featured', featured)
router.use('/domain', domain)
router.use('/check_domain', check_domain)
router.use(_id)

module.exports = router
