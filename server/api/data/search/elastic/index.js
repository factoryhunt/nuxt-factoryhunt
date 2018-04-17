const router = require('express').Router()

const _ = require('./_')
const suggestion = require('./suggestion')

router.get('/elastic/:input', _)
router.post('/elastic/suggestion', suggestion)

module.exports = router
