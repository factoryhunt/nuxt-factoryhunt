const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { bucket } = require('./.config')
const crpyto = require('crypto')

// POST /api/data/documents/
AWS.config.region = 'us-west-1' //지역 설정
const s3 = new AWS.S3()
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // metadata: function(req, file, cb) {
    //   cb(null, file)
    // },
    key: function(req, file, cb) {
      const { parent_table, parent_id } = req.body
      const { fieldname, originalname } = file
      let mimetype = file.mimetype.split('/')
      mimetype = mimetype[mimetype.length - 1]

      const path = `${parent_table}/${parent_id}/${originalname}.${mimetype}`

      cb(null, path)
    }
  })
})

module.exports = upload

// Upload by using Memory Storage
// const memoryStorage = multer.memoryStorage()
// const upload = multer({ storage: memoryStorage })
