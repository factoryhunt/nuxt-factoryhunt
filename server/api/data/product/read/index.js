const router = require('express').Router()

const product_id = require('./product_id')
const account_id = require('./account_id')
const keyword = require('./keyword')
const domain = require('./domain')

router.use('/product_id', product_id)
router.use('/account_id', account_id)
router.use('/keyword', keyword)
router.use('/domain', domain)

module.exports = router
