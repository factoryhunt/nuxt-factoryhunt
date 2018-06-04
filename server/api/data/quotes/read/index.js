const router = require('express').Router()

const _domain = require('./_domain')

router.get('/domain/:domain', _domain)

module.exports = router
