const router = require('express').Router()

const lead = require('./lead')
const account = require('./account')
const contact = require('./contact')
const product = require('./product')
const documents = require('./documents')
const inbox = require('./inbox')
const history = require('./history')
const search = require('./search')
const sitemap = require('./sitemap')

router.use('/lead', lead)
router.use('/account', account)
router.use('/contact', contact)
router.use('/product', product)
router.use('/documents', documents)
router.use('/inbox', inbox)
router.use('/history', history)
router.use('/search', search)
router.use('/sitemap', sitemap)

module.exports = router
