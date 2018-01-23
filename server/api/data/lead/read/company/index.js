const router = require('express').Router()

const _ = require('./_')
const _company = require('./_company')

router.get('/', _)
router.get('/:company', _company)

module.exports = router
