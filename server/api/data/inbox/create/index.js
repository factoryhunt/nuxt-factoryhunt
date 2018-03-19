const router = require('express').Router()

const message = require('./message')

router.put('/message', message)

module.exports = router
