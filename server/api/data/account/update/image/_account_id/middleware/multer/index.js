const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const config = require('../../../../../../../.config')

// POST /api/data/account/image/:account_id
AWS.config.region = 'us-west-1' //지역 설정
const s3 = new AWS.S3()
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      const account_id = req.params.account_id
      const file_name = file.originalname
      cb(null, `accounts/${account_id}/company_images/${file_name}`)
    }
  })
})

module.exports = upload

// Upload by using Memory Storage
// const memoryStorage = multer.memoryStorage()
// const upload = multer({ storage: memoryStorage })
