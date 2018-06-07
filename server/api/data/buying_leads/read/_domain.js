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
        a.account_name,
        a.domain,
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
        ${MYSQL_MODELS.TABLE_BUYING_LEADS} bl,
        ${MYSQL_MODELS.TABLE_CONTACTS} c,
        ${MYSQL_MODELS.TABLE_ACCOUNTS} a
      WHERE
        bl.domain = "${domain}" AND
        bl.author_id = c.contact_id AND
        c.account_id = a.account_id
      `
      const ERR_MSG = 'Malformed Buying Leads Query.'

      mysql.query(SQL, (err, results) => {
        if (err) reject(onError(1001, ERR_MSG, err))

        if (!results.length) resolve(null)

        resolve(results[0])
      })
    })
  }

  const getDocuments = buying_lead_id => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        id,
        original_name,
        content_type,
        body_length,
        body_length_compressed,
        location
      FROM
        ${MYSQL_MODELS.TABLE_DOCUMENTS}
      WHERE
        parent_table = "buying_leads" AND
        parent_id = ${buying_lead_id} AND
        is_deleted != 1
      `
      const ERR_MSG = 'Malformed Documents Query.'

      mysql.query(SQL, (err, results) => {
        if (err) reject(onError(1002, ERR_MSG, err))
        if (!results.length) resolve([])

        resolve(results)
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
        a.account_id,
        a.account_name,
        a.domain as account_domain,
        a.mailing_country,
        a.business_type,
        c.contact_id,
        c.salutation,
        c.first_name,
        c.last_name,
        c.contact_title,
        d.location
      FROM
        ${MYSQL_MODELS.TABLE_QUOTES} q,
        ${MYSQL_MODELS.TABLE_DOCUMENTS} d,
        ${MYSQL_MODELS.TABLE_ACCOUNTS} a,
        ${MYSQL_MODELS.TABLE_CONTACTS} c
      WHERE
      	q.buying_lead_id = ${buying_lead_id} AND
        q.is_deleted != 1 AND
        a.account_id = c.account_id AND
        q.contact_id = c.contact_id AND
        d.parent_table = "${MYSQL_MODELS.TABLE_QUOTES}" AND
        d.parent_id = q.id
      ORDER BY
      	q.created_date 
      `
      const ERR_MSG = 'Malformed Quotes Query.'

      mysql.query(SQL, (err, results) => {
        if (err) reject(onError(1003, ERR_MSG, err))

        resolve(results)
      })
    })
  }

  const cleanQuotes = quotes => {
    const reducer = function(accumulator, quote, index) {
      if (index === 0) {
        quote.files = []
        quote.files.push(quote.location)
        accumulator.push(quote)
      } else {
        const lastQuote = accumulator[accumulator.length - 1]
        const isSameQuote = lastQuote.quote_id === quote.quote_id

        if (isSameQuote) {
          accumulator[accumulator.length - 1].files.push(quote.location)
        } else {
          quote.files = []
          quote.files.push(quote.location)
          accumulator.push(quote)
        }
      }

      return accumulator
    }
    const result = quotes.reduce(reducer, [])

    return result
  }

  try {
    const buying_lead = await getBuyingLead()
    const documents = await getDocuments(buying_lead.buying_lead_id)
    let quotes = await getQuotes(buying_lead.buying_lead_id)
    if (quotes.length) quotes = cleanQuotes([...quotes])

    const result = {
      buying_lead,
      documents,
      quotes
    }
    res.status(200).json(result)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
