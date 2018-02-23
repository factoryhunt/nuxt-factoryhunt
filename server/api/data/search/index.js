const router = require('express').Router()

const _input = require('./_input')
const test = require('./test')

router.use(_input)
router.use(test)

module.exports = router
