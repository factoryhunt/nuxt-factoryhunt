const router = require('express').Router()

const _ = require('./_')

router.get('/elastic/:input/:page', _)

module.exports = router
