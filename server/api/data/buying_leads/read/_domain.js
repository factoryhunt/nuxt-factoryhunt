const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')
const { onError } = require('../../../../utils/error')

// GET /api/data/buying_leads/domain/:domain
module.exports = async (req, res) => {
  const { domain } = req.params

  const getBuyingLead = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        bl.buying_lead_id,
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
        GROUP_CONCAT(d.location SEPARATOR '||') AS location,
        a.account_name,
        a.account_type,
        a.logo_url,
        a.domain as account_domain,
        a.mailing_country,
        c.contact_id,
        c.account_id,
        c.first_name,
        c.last_name,
        c.contact_title,
        TIMESTAMPDIFF(DAY, now(), bl.due_date) as due_day_diff,
        TIMESTAMPDIFF(HOUR, now(), bl.due_date) as due_hour_diff,
        TIMESTAMPDIFF(MINUTE, now(), bl.due_date) as due_minute_diff,
        TIMESTAMPDIFF(YEAR, bl.created_date, NOW()) as year_diff,
        TIMESTAMPDIFF(MONTH, bl.created_date, NOW()) as month_diff,
        TIMESTAMPDIFF(WEEK, bl.created_date, NOW()) as week_diff,
        DATEDIFF(NOW(), bl.created_date) as day_diff,
        TIMESTAMPDIFF(HOUR, bl.created_date, NOW()) as hour_diff,
        TIMESTAMPDIFF(MINUTE, bl.created_date, NOW()) as minute_diff,
        TIMESTAMPDIFF(SECOND, bl.created_date, NOW()) as second_diff
      FROM
        ${MYSQL_MODELS.TABLE_BUYING_LEADS} bl
      LEFT JOIN 
        ${MYSQL_MODELS.TABLE_DOCUMENTS} d
      ON 
        d.parent_id = bl.buying_lead_id AND 
        d.parent_table = "${MYSQL_MODELS.TABLE_BUYING_LEADS}" AND
        d.is_deleted != 1
      LEFT JOIN
        ${MYSQL_MODELS.TABLE_CONTACTS} c
      ON
        bl.author_id = c.contact_id
      LEFT JOIN
        ${MYSQL_MODELS.TABLE_ACCOUNTS} a
      ON
        c.account_id = a.account_id
      WHERE
        bl.is_deleted != 1 AND
        bl.domain = ?
      `
      const ERR_MSG = 'Malformed Buying Leads Query.'

      mysql.query(SQL, [domain], (err, rows) => {
        if (err) reject(onError(1001, ERR_MSG, err))

        if (!rows.length) resolve(null)

        const result = extractFiles(rows)

        resolve(rows[0])
      })
    })
  }

  const getQuotes = buying_lead_id => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        q.id as quote_id,
        q.description,
        TIMESTAMPDIFF(YEAR, q.created_date, NOW()) as year_diff,
        TIMESTAMPDIFF(MONTH, q.created_date, NOW()) as month_diff,
        TIMESTAMPDIFF(WEEK, q.created_date, NOW()) as week_diff,
        TIMESTAMPDIFF(DAY, q.created_date, NOW()) as day_diff,
        TIMESTAMPDIFF(HOUR, q.created_date, NOW()) as hour_diff,
        TIMESTAMPDIFF(MINUTE, q.created_date, NOW()) as minute_diff,
        TIMESTAMPDIFF(SECOND, q.created_date, NOW()) as second_diff,
        GROUP_CONCAT(d.location SEPARATOR '||') AS location,
        a.account_id,
        a.account_name,
        a.logo_url,
        a.domain AS account_domain,
        a.mailing_country,
        a.business_type,
        c.contact_id,
        c.first_name,
        c.last_name,
        c.contact_title,
        c.contact_email
      FROM
        ${MYSQL_MODELS.TABLE_QUOTES} q
      LEFT JOIN 
        ${MYSQL_MODELS.TABLE_DOCUMENTS} d
      ON 
        d.parent_id = q.id AND 
        d.parent_table = "${MYSQL_MODELS.TABLE_QUOTES}" AND
        d.is_deleted != 1
      LEFT JOIN
        ${MYSQL_MODELS.TABLE_CONTACTS} c
      ON
        q.contact_id = c.contact_id
      LEFT JOIN
        ${MYSQL_MODELS.TABLE_ACCOUNTS} a
      ON
        c.account_id = a.account_id
      WHERE
        q.is_deleted != 1 AND
        q.buying_lead_id = ?
      GROUP BY 
        q.id
      `
      const ERR_MSG = 'Malformed Quotes Query.'

      mysql.query(SQL, [buying_lead_id], (err, rows) => {
        if (err) reject(onError(1003, ERR_MSG, err))

        if (!rows.length) resolve([])

        const result = extractFiles(rows)
        resolve(result)
      })
    })
  }

  const extractFiles = rows => {
    const mapHandler = row => {
      let { location } = row
      row.files = location ? location.split('||') : []
      return row
    }

    return rows.map(mapHandler)
  }

  try {
    const buying_lead = await getBuyingLead()
    const quotes = await getQuotes(buying_lead.buying_lead_id)

    const payload = {
      buying_lead,
      quotes
    }
    res.status(200).json(payload)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
