const router = require('express').Router()

const lead_id = require('./lead_id')

router.post('/:lead_id', lead_id)

module.exports = router

