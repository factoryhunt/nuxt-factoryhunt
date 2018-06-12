const router = require('express').Router()

const _contact_id = require('./_contact_id')
const _conversation_id = require('./_conversation_id')

router.get('/contact_id/:contact_id', _contact_id)
router.get('/conversation_id/:conversation_id/:recipient_id', _conversation_id)

module.exports = router
