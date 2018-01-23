const multer = require('multer')
const AWS = require('aws-sdk')

AWS.config.region = 'us-west-1' //지역 설정
const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })

module.exports = upload
