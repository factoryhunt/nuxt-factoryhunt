const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// GET /api/data/buying_leads
// Query: category,
module.exports = async (req, res) => {
  const getBuyingLeads = () => {
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
        preferred_unit_price,
        preferred_unit_price_currency,
        delivery_term,
        destination_port,
        payment_type,
        due_date,
        created_date,
        last_modified_date
      FROM
        ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      WHERE 
        status = "Activated" AND
        is_deleted != 1 
      ORDER BY
        last_modified_date DESC
      `,
        (err, results) => {
          if (err) reject({ msg: 'Getting Buying Lead Failed. - 1', err: err })
          resolve(results)
        }
      )
    })
  }

  try {
    const buying_leads = await getBuyingLeads()
    res.status(200).json(buying_leads)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
