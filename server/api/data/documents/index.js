const router = require('express').Router()

const single = require('./single')
const certifications = require('./certifications')

router.use('/single', single)
router.use('/certifications', certifications)

module.exports = router
