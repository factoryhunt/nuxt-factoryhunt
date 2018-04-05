const router = require('express').Router()

const _input = require('./_input')
const elastic = require('./elastic')

router.use(elastic)
router.use(_input)

module.exports = router
