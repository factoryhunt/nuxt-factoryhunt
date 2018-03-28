const router = require('express').Router()

const certifications = require('./certifications')

router.use('/certifications', certifications)

module.exports = router
