const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const config = require('../../../../../../.config')

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
      // const file_name = file.originalname
      console.log(file)
      cb(null, `accounts/${account_id}/pdf`)
    }
  })
})

module.exports = upload
