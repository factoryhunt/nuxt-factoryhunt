const router = require('express').Router()

const company = require('./company')
const contact = require('./contact')
const find_password = require('./find_password')
const product = require('./product')
const sign_up = require('./sign_up')
const ads = require('./ads')
const convert = require('./convert')

router.post('/company', company)
router.post('/contact', contact)
router.post('/find_password', find_password)
router.post('/product', product)
router.post('/sign_up', sign_up)
router.post('/ads', ads)
router.post('/convert', convert)

module.exports = router
