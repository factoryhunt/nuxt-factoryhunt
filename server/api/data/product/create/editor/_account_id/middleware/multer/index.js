const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const config = require('../../../../../../../.config')

AWS.config.region = 'us-west-1'
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
      const date = Date.now().toString()
      cb(null, `products-eng/editor_images/${date}`)
    }
  })
})

module.exports = upload