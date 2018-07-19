const router = require('express').Router()

const paypal = require('./paypal')

router.use('/paypal', paypal)

module.exports = router
