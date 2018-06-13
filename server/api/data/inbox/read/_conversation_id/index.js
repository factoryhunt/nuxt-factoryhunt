const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/inbox/conversation_id/:conversation_id/:recipient_id
module.exports = async (req, res) => {
  const { conversation_id, recipient_id } = req.params

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
        a.domain as account_domain,
        a.logo_url,
        a.mailing_country
      FROM
        contacts c
      LEFT JOIN
        accounts a
      ON
        c.account_id = a.account_id
      WHERE
        contact_id = ?
      `
      mysql.query(SQL, [recipient_id], (err, rows) => {
        if (err) reject(err)

        if (!rows.length) resolve([])
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
        ${CONFIG_MYSQL.TABLE_INBOX}
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
    const datas = await Promise.all([getRecipient(), getMessages()])
    const result = {
      recipient: datas[0],
      messages: datas[1]
    }
    res.status(200).json(result)
  } catch (err) {
    res.status(403).json({ result: false })
  }
}
