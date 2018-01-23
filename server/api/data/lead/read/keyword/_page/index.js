const router = require('express').Router()

const _page = require('./_page')

router.get('/:keyword/:page', _page)

module.exports = router
