const router = require('express').Router()

const _account_id = require('./_account_id')
const image = require('./image')

router.use(_account_id)
router.use('/image', image)

module.exports = router
