const router = require('express').Router()

const _ = require('./_quote_id')

router.delete('/:quote_id', _)

module.exports = router
