const router = require('express').Router()

const _id = require('./_id')

router.get('/:lead_id', _id)

module.exports = router
