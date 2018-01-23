const router = require('express').Router()

const company = require('./company')
const contact = require('./contact')
const product = require('./product')
const sign_up = require('./sign_up')

router.post('/company', company)
router.post('/contact', contact)
router.post('/product', product)
router.post('/sign_up', sign_up)

module.exports = router
