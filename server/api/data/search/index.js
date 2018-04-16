const router = require('express').Router()

const elastic = require('./elastic')

router.use(elastic)

module.exports = router
