const router = require('express').Router()

const _account_id = require('./_account_id')

router.get('/:account_id', _account_id)

module.exports = router
