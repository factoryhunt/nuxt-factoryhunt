const router = require('express').Router()

const _ = require('./_')
const _conversation_id = require('./_conversation_id')

router.get('/:contact_id', _)
router.get('/:contact_id/:conversation_id', _conversation_id)

module.exports = router
