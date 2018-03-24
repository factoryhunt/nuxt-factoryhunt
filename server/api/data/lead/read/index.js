const router = require('express').Router()

const _id = require('./_id')
const email = require('./email')
const company = require('./company')
const keyword = require('./keyword')

router.use(_id)
router.use('/company', company)
router.use('/keyword', keyword)

router.post('/email', email)

module.exports = router
