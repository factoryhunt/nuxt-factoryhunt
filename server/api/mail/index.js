const router = require('express').Router()

const company = require('./company')
const contact = require('./contact')
const find_password = require('./find_password')
const product = require('./product')
const sign_up = require('./sign_up')
const ads = require('./ads')

const convert_lead_buyer = require('./convert/lead_buyer')
const convert_lead_supplier = require('./convert/lead_supplier')

router.post('/company', company)
router.post('/contact', contact)
router.post('/find_password', find_password)
router.post('/product', product)
router.post('/sign_up', sign_up)
router.post('/ads', ads)
router.post('/convert_lead_buyer', convert_lead_buyer)
router.post('/convert_lead_supplier', convert_lead_supplier)

module.exports = router
