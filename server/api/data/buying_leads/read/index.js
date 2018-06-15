const router = require('express').Router()

const _ = require('./_')
const _contact_id = require('./_contact_id')
const _domain = require('./_domain')
const activity_contact_id = require('./activity_contact_id')

router.get('/', _)
router.get('/:contact_id/', _contact_id)
router.get('/domain/:domain', _domain)
router.get('/activity/:contact_id', activity_contact_id)

module.exports = router
