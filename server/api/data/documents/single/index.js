const router = require('express').Router()

const create = require('./create')
const update = require('./update')
const remove = require('./remove')

// middlewares
const multer = require('../../../middleware/multer/single')

router.post('/', multer.single('document'), create)
router.put('/', update)
router.delete('/', remove)

module.exports = router
