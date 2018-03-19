const router = require('express').Router()

const _id = require('./_id')

router.get('/:account_id', _id)

module.exports = router
