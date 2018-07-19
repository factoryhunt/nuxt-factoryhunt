const router = require('express').Router()

const _ = require('./_')
const membership = require('./membership')
const pdf = require('./pdf')

const config_multer = require('./middleware/multer')

router.put('/:account_id', _)
router.put('/:account_id/membership', membership)
router.put('/:account_id/pdf', config_multer.array('pdf', 1), pdf)

module.exports = router
