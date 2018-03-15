const router = require('express').Router()

const _product_id = require('./_product_id')
const editor = require('./editor')

router.use(_product_id)
router.use('/editor', editor)

module.exports = router
