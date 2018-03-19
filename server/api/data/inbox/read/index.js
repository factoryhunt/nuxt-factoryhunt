const router = require('express').Router()

const contact_id = require('./contact_id')

router.use('/contact_id', contact_id)

module.exports = router
