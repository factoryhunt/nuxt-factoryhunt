const router = require('express').Router()

const _keyword = require('./_keyword')
const _page = require('./_page')

router.get('/:keyword', _keyword)
router.use(_page)

module.exports = router
