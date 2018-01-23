const router = require('express').Router()

const _ = require('./_')
const password_change = require('./password_change')

router.put('/:contact_id', _)
router.use(password_change)

module.exports = router
