const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// GET /api/data/buying_leads
// query: category, offset
module.exports = async (req, res) => {
  // static
  const QUERY_LIMIT = 20

  // LIKE query
  let category = req.query.category || ''
  category = `%${category}%`

  // Pagination
  let offset = req.query.offset || 0
  offset = offset * QUERY_LIMIT

  // Promises
  const getBuyingLeads = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT 
        bl.buying_lead_id,
        bl.account_id,
        bl.author_id,
        bl.status,
        bl.domain,
        bl.category,
        bl.title,
        bl.description,
        bl.quantity,
        bl.unit,
        bl.preferred_unit_price,
        bl.preferred_unit_price_currency,
        bl.delivery_term,
        bl.destination_port,
        bl.payment_type,
        bl.due_date,
        bl.created_date,
        bl.last_modified_date,
        TIMESTAMPDIFF(DAY, now(), bl.due_date) as due_day_diff,
        TIMESTAMPDIFF(HOUR, now(), bl.due_date) as due_hour_diff,
        TIMESTAMPDIFF(MINUTE, now(), bl.due_date) as due_minute_diff,
        a.mailing_country,
        docs.id as document_id,
        docs.location,
        (SELECT
          COUNT(q.id)
        FROM
          quotes q
        WHERE
          q.buying_lead_id = bl.buying_lead_id) as quote_length
      FROM
        ${MYSQL_MODELS.TABLE_BUYING_LEADS} bl
      LEFT JOIN
        ${MYSQL_MODELS.TABLE_DOCUMENTS} docs
      ON 
        docs.parent_table = "${MYSQL_MODELS.TABLE_BUYING_LEADS}" AND
        docs.parent_id = bl.buying_lead_id AND
        docs.is_deleted != 1
      LEFT JOIN
        ${MYSQL_MODELS.TABLE_ACCOUNTS} a
      ON
        bl.account_id = a.account_id
      WHERE 
        bl.status = "Activated" AND
        bl.is_deleted != 1 AND
        bl.category LIKE ?
      GROUP BY 
        bl.buying_lead_id
      ORDER BY
        bl.created_date DESC
      LIMIT
        ${QUERY_LIMIT}
      OFFSET
        ?
      `
      mysql.query(SQL, [category, offset], (err, results) => {
        if (err) reject({ msg: 'Getting Buying Lead Failed. - 1', err: err })
        resolve(results)
      })
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
