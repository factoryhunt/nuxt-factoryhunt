const router = require('express').Router()

const _ = require('./_')

router.get('/test/:input/:page', _)

module.exports = router
