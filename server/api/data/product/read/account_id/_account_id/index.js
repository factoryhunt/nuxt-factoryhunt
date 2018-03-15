const router = require('express').Router()

const _ = require('./_')
const approved = require('./approved')

router.get('/:contact_id', _)
router.get('/:contact_id/approved', approved)

module.exports = router
