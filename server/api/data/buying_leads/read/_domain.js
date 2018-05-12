const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// GET /api/data/buying_leads/domain/:domain
module.exports = async (req, res) => {
  const { domain } = req.params

  const getBuyingLead = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      SELECT 
      buying_lead_id,
      account_id,
      author_id,
      status,
      domain,
      category,
      title,
      description,
      quantity,
      unit,
      duration,
      preferred_unit_price,
      preferred_unit_price_currency,
      delivery_term,
      destination_port,
      payment_type,
      created_date,
      last_modified_date
      FROM
      ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      WHERE 
      domain = "${domain}" AND
      isDeleted != 1
      `,
        (err, results) => {
          if (err) reject(err)
          if (!results.length) resolve([])

          resolve(results[0])
        }
      )
    })
  }

  try {
    const buying_lead = await getBuyingLead()
    res.status(200).json(buying_lead)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
