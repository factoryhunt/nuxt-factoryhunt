const router = require('express').Router()

const contact_id = require('./contact_id')
const conversation_id = require('./contact_id/_contact_id/_conversation_id')

router.use('/contact_id', contact_id)
router.use('/_conversation_id', conversation_id)

module.exports = router
