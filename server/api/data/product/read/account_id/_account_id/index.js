const router = require('express').Router()

const _ = require('./_')
const approved = require('./approved')

router.get('/:account_id', _)
router.get('/:account_id/approved', approved)

module.exports = router
