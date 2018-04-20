const router = require('express').Router()

const _id = require('./_id')
const email = require('./email')
const company = require('./company')

router.use(_id)
router.use('/company', company)

router.post('/email', email)

module.exports = router
