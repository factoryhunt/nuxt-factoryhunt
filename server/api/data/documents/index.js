const router = require('express').Router()

const create = require('./create')
const certifications = require('./certifications')

// middlewares
const multer = require('../../middleware/multer')

router.post('/:parent_id', multer.single('document'), create)
router.use('/certifications', certifications)

module.exports = router
