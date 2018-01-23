const router = require('express').Router()

const featured = require('./featured')
const _id = require('./_id')
const domain = require('./domain')
const keyword = require('./keyword')

router.use('/featured', featured)
router.use(_id)
router.use('/domain', domain)
router.use('/keyword', keyword)

module.exports = router
