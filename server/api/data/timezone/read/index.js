const router = require('express').Router()

const db_server_time = require('./db_server_time')

router.get('/db_server_time', db_server_time)

module.exports = router
