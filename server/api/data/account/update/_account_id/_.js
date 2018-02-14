const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// PUT /api/data/account/:id
module.exports = async (req, res) => {
  const account_id = req.params.account_id
  const { account_data } = req.body
  // const {
  //   domain,
  //   thumbnail_url,
  //   account_image_url_1,
  //   account_name,
  //   account_name,
  //   company_short_description,
  //   company_short_description,
  //   company_description,
  //   company_description,
  //   products,
  //   website,
  //   phone,
  //   established_date,
  //   mailing_country,
  //   mailing_state,
  //   mailing_city,
  //   mailing_postal_code,
  //   mailing_street_address,
  //   mailing_street_address_2,
  //   history,
  //   mailing_country,
  //   mailing_state,
  //   mailing_city,
  //   mailing_postal_code,
  //   mailing_street_address,
  //   mailing_street_address_2,
  //   history
  // } = req.body

  const update = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_ACCOUNTS} SET ? WHERE account_id = ${account_id}`, account_data,
        (err) => {
          if (err) reject(err)
          resolve()
        })
    })
  }

  try {
    await update()
    res.status(200).json({result: true, msg: 'Account has been updated.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
