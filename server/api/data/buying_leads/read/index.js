const router = require('express').Router()

const _ = require('./_')
const _account_id = require('./_account_id')
const _domain = require('./_domain')

router.get('/', _)
router.get('/:account_id', _account_id)
router.get('/domain/:domain', _domain)

module.exports = router
