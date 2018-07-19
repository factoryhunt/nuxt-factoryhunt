const mysql = require('../../../../mysql/index')
const { onError } = require('../../../../../utils/error')

// GET /api/data/account/featured
module.exports = async (req, res) => {
  const getAccounts = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        a.account_id,
        a.account_name,
        a.domain,
        a.products,
        a.cover_image_url_1,
        a.mailing_country,
        TIMESTAMPDIFF(SECOND, NOW(), a.membership_valid_until) AS membership_left_time,
          (SELECT
              COUNT(p.product_id)
          FROM
              products p
          WHERE
              p.isDeleted != 1 AND
              account_id = a.account_id) AS total_product_length
      FROM
        accounts a
      WHERE
        a.isDeleted != 1 AND
        a.account_status = "approved" AND
        a.customer_priority > 2 AND
        a.account_name > "" AND
        a.products > "" AND
        a.cover_image_url_1 > "" AND
        a.mailing_country > ""
      ORDER BY
        a.mailing_country,
        rand()
      `
      const ERR_MSG = 'Malformed Accounts Query'

      mysql.query(SQL, (err, rows) => {
        if (err) reject(onError(1001, ERR_MSG, err))

        const reducer = function(accumulator, supplier) {
          const { mailing_country } = supplier

          if (!accumulator.hasOwnProperty(mailing_country)) {
            accumulator[mailing_country] = new Array()
          }

          accumulator[mailing_country].push(supplier)

          return accumulator
        }

        const features = rows.reduce(reducer, {})

        resolve(features)
      })
    })
  }

  const getAccountsByRandom = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      SELECT * 
      FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS}
      WHERE 
      customer_priority > 2 AND
      cover_image_url_1 != "" AND
      products != "" AND
      account_name != "" AND
      company_short_description != "" AND
      isDeleted != 1
      ORDER BY 
      customer_priority DESC, 
      rand()
      LIMIT 100`,
        (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        }
      )
    })
  }

  try {
    const features = await getAccounts()
    res.status(200).json(features)
  } catch (err) {
    console.log('\nerr\n', err)
    res.status(403).json(err)
  }
}
