const router = require('express').Router()

const _input = require('./_input')
const test = require('./test')
const elastic = require('./elastic')

router.use(elastic)
router.use(_input)
router.use(test)

module.exports = router
