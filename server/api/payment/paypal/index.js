const router = require('express').Router()

const create_payment = require('./create_payment')
const execute_payment = require('./create_payment')

router.post('/create_payment', create_payment)
router.post('/execute_payment', execute_payment)

module.exports = router
