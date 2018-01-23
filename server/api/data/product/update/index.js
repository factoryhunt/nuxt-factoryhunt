const router = require('express').Router()

const _product_id = require('./_product_id')

router.use(_product_id)

module.exports = router
