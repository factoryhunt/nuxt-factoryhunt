const router = require('express').Router()

const _company = require('./_company')

router.get('/:company', _company)

module.exports = router
