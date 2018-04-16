const router = require('express').Router()

const _ = require('./_')

router.get('/elastic/:input', _)

module.exports = router
