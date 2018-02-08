const router = require('express').Router()

const _ = require('./_')
const _page = require('./_page')

router.get('/:input', _)
router.use(_page)

module.exports = router
