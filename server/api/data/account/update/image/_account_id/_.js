const mysql = require('../../../../../mysql')
const CONFIG_MYSQL = require('../../../../../mysql/model')
const AWS = require('aws-sdk')
const config = require('../../../../../.config')

// PUT /api/data/account/image/:account_id
module.exports = async (req, res) => {
  const account_id = req.params.account_id
  const db_column = req.body.db_column
  const {
    mimetype,
    buffer
  } = req.files[0]
  const key = db_column === 'thumbnail_url' ? 'logo' : 'cover'

  const params = { // AWS S3업로드에 대한 정보 입니다.
    Bucket: config.bucketName, // S3 Bucket 이름을 지정합니다.
    Key: `accounts/${account_id}/${key}`, // Key : S3의 경로 및 파일 이름을 지정합니다.
    ACL: 'public-read', // ACL : 파일 권한에 대한 설정입니다.
    ContentType: mimetype,
    Body: buffer
  }
  const s3 = new AWS.S3()

  const uploadToS3 = () => {
    return new Promise((resolve, reject) => {
      s3.upload(params).send((err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }

  const urlUpdate = (location) => {
    return new Promise((resolve, reject) => {
      let data;
      if (db_column === 'thumbnail_url') {
        data = { thumbnail_url: location }
      } else if (db_column === 'account_image_url_1') {
        data = { account_image_url_1: location }
      }
      mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_ACCOUNTS} SET ? WHERE account_id = ${account_id}`, data,
        (err) => {
          if (err) reject(err)
          resolve()
        })
    })
  }

  try {
    const { Location: location } = await uploadToS3()
    await urlUpdate(location)
    res.status(200).json({result: true, msg: 'Account single image has been changed successfully.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
