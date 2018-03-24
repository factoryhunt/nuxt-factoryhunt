const router = require('express').Router()

const data = require('./data')
const auth = require('./auth')
const mail = require('./mail')
const i18n = require('./i18n')
const jwt = require('./jwt')

router.use('/data', data)
router.use('/auth', auth)
router.use('/mail', mail)
router.use('/i18n', i18n)
router.use('/jwt', jwt)

module.exports = router
