const mysql = require('../../../../../mysql')
const CONFIG_MYSQL = require('../../../../../mysql/model')
const AWS = require('aws-sdk')
const config = require('../../../../../.config')

// PUT /api/data/account/image/:contact_id
module.exports = async (req, res) => {
  const account_id = req.params.account_id
  const db_column = req.body.db_column

  const urlUpdate = () => {
    return new Promise((resolve, reject) => {
      let data = {};
      if (db_column === 'logo_url') {
        data = { logo_url: req.files.logo[0].location }
      }
      else if (db_column === 'cover_image_url_1') {
        data.cover_image_url_1 = req.body.cover_image_url_1 ? req.body.cover_image_url_1 : ''
        data.cover_image_url_2 = req.body.cover_image_url_2 ? req.body.cover_image_url_2 : ''
        data.cover_image_url_3 = req.body.cover_image_url_3 ? req.body.cover_image_url_3 : ''
        data.cover_image_url_4 = req.body.cover_image_url_4 ? req.body.cover_image_url_4 : ''
        data.cover_image_url_5 = req.body.cover_image_url_5 ? req.body.cover_image_url_5 : ''
        data.cover_image_url_6 = req.body.cover_image_url_6 ? req.body.cover_image_url_6 : ''
        data.cover_image_url_7 = req.body.cover_image_url_7 ? req.body.cover_image_url_7 : ''
        data.cover_image_url_8 = req.body.cover_image_url_8 ? req.body.cover_image_url_8 : ''

        if (req.files.cover_0) data.cover_image_url_1 = req.files.cover_0[0].location
        if (req.files.cover_1) data.cover_image_url_2 = req.files.cover_1[0].location
        if (req.files.cover_2) data.cover_image_url_3 = req.files.cover_2[0].location
        if (req.files.cover_3) data.cover_image_url_4 = req.files.cover_3[0].location
        if (req.files.cover_4) data.cover_image_url_5 = req.files.cover_4[0].location
        if (req.files.cover_5) data.cover_image_url_6 = req.files.cover_5[0].location
        if (req.files.cover_6) data.cover_image_url_7 = req.files.cover_6[0].location
        if (req.files.cover_7) data.cover_image_url_8 = req.files.cover_7[0].location
      }

      mysql.query(`
      UPDATE ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
      SET ?,
      last_modified_date = (SELECT NOW()) 
      WHERE account_id = ${account_id}`, data,
        (err) => {
          if (err) reject(err)
          resolve()
        })
    })
  }

  try {
    await urlUpdate()
    res.status(200).json({result: true, msg: 'Account single image has been changed successfully.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
