const router = require('express').Router()

const decode = require('./decode')

router.post('/decode', decode)

module.exports = router
