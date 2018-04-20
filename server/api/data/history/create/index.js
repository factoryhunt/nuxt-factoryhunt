const router = require('express').Router()

const _contact_id = require('./_contact_id')

router.post('/:contact_id', _contact_id)

module.exports = router
