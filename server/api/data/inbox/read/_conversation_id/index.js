const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')
const { onError } = require('../../../../../utils/error')

// GET /api/data/inbox/conversation_id/:conversation_id/:recipient_id
module.exports = async (req, res) => {
  let { conversation_id, recipient_id } = req.params
  const is_lead = recipient_id.indexOf('L') !== -1
  recipient_id = recipient_id.replace(/L/g, '')

  const getRecipient = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        c.contact_id,
        c.salutation,
        c.first_name,
        c.last_name,
        c.contact_title,
        a.account_id,
        a.account_name,
        a.account_type,
        a.business_type,
        a.account_industries,
        a.products,
        a.products_buy,
        a.number_of_employees,
        a.established_year,
        a.phone,
        a.website,
        a.total_annual_revenue,
        a.language_spoken,
        a.mailing_country,
        a.mailing_state,
        a.mailing_city,
        a.mailing_street_address,
        a.mailing_street_address_2,
        a.mailing_postal_code,
        a.domain AS account_domain,
        a.logo_url
      FROM
        contacts c
      LEFT JOIN
        accounts a
      ON
        c.account_id = a.account_id
      WHERE
        contact_id = ?
      `
      mysql.query(SQL, recipient_id, (err, rows) => {
        if (err) reject(err)

        if (!rows.length) resolve({})
        resolve(rows[0])
      })
    })
  }

  const getLeadRecipient = () => {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT
        lead_id,
        company AS account_name,
        email AS contact_email,
        business_type,
        products,
        domain AS account_domain,
        number_of_employees,
        first_name,
        last_name,
        contact_title,
        salutation,
        phone,
        website,
        established_date,
        languages,
        mailing_country,
        mailing_state,
        mailing_city,
        mailing_street_address,
        mailing_street_address_2
      FROM
        leads
      WHERE
        lead_id = ?
    `
      mysql.query(sql, recipient_id, (err, rows) => {
        if (err) reject(err)

        if (!rows.length) resolve({})
        resolve(rows[0])
      })
    })
  }

  const getMessages = () => {
    const SQL = `
      SELECT 
        inbox_id,
        sender_id,
        recipient_id,
        conversation_id,
        body,
        created_date,
        TIMESTAMPDIFF(YEAR, created_date, NOW()) as year_diff,
				TIMESTAMPDIFF(MONTH, created_date, NOW()) as month_diff,
        TIMESTAMPDIFF(WEEK, created_date, NOW()) as week_diff,
				TIMESTAMPDIFF(DAY, created_date, NOW()) as day_diff,
				TIMESTAMPDIFF(HOUR, created_date, NOW()) as hour_diff,
				TIMESTAMPDIFF(MINUTE, created_date, NOW()) as minute_diff,
        TIMESTAMPDIFF(SECOND, created_date, NOW()) as second_diff
      FROM 
        inbox
      WHERE 
        conversation_id = ?
      ORDER BY
        inbox_id DESC
      `
    return new Promise((resolve, reject) => {
      mysql.query(SQL, [conversation_id], (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  try {
    let datas
    if (is_lead) datas = await Promise.all([getLeadRecipient(), getMessages()])
    else datas = await Promise.all([getRecipient(), getMessages()])

    const result = {
      recipient: datas[0],
      messages: datas[1]
    }
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(403).json({ result: false })
  }
}
