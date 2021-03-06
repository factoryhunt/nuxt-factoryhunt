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
      console.log(21)
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      const product_id = req.product_id
      const file_name = file.originalname
      console.log(22)
      cb(null, `products-eng/${product_id}/thumbnail_images/${file_name}`)
    }
  })
})

module.exports = upload
