const router = require('express').Router()

const _buying_lead_id = require('./_buying_lead_id')

router.delete('/:buying_lead_id', _buying_lead_id)

module.exports = router
