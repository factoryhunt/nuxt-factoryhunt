const router = require('express').Router()

const data = require('./data')
const auth = require('./auth')
const mail = require('./mail')

router.use('/data', data)
router.use('/auth', auth)
router.use('/mail', mail)

module.exports = router
