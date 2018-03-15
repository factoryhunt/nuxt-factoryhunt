const router = require('express').Router()

const _ = require('./_')
const pdf = require('./pdf')

const config_multer = require('./middleware/multer')

router.put('/:contact_id', _)
router.put('/:contact_id/pdf', config_multer.array('pdf', 1), pdf)

module.exports = router
