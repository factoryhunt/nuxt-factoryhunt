const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/inbox/contact_id/:contact_id
module.exports = async (req, res) => {
  const contact_id = req.params.contact_id

  const getAllMessages = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        i.inbox_id,
        i.sender_id,
        i.recipient_id,
        i.conversation_id,
        i.body,
        c.contact_id,
        c.first_name,
        c.last_name,
        c.contact_title,
        i.created_date,
        a.account_id,
        a.account_name,
        a.logo_url,
        TIMESTAMPDIFF(YEAR, i.created_date, NOW()) as year_diff,
				TIMESTAMPDIFF(MONTH, i.created_date, NOW()) as month_diff,
        TIMESTAMPDIFF(WEEK, i.created_date, NOW()) as week_diff,
				TIMESTAMPDIFF(DAY, i.created_date, NOW()) as day_diff,
				TIMESTAMPDIFF(HOUR, i.created_date, NOW()) as hour_diff,
				TIMESTAMPDIFF(MINUTE, i.created_date, NOW()) as minute_diff,
        TIMESTAMPDIFF(SECOND, i.created_date, NOW()) as second_diff
      FROM
        ${CONFIG_MYSQL.TABLE_INBOX} i,
        ${CONFIG_MYSQL.TABLE_CONTACTS} c,
        ${CONFIG_MYSQL.TABLE_ACCOUNTS} a
      WHERE
        (i.inbox_id
        IN
          (
          SELECT 
            MAX(i.inbox_id)
          FROM
            ${CONFIG_MYSQL.TABLE_INBOX} i
          WHERE
            (i.sender_id = ${contact_id} OR
            i.recipient_id = ${contact_id})
          GROUP BY
            i.conversation_id
          )
        )
      AND
        (i.sender_id = c.contact_id OR
        i.recipient_id = c.contact_id)
      AND
        c.contact_id != ${contact_id}
      AND
        c.account_id = a.account_id
      ORDER BY
        i.inbox_id DESC
      `
      mysql.query(SQL, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  try {
    const messages = await getAllMessages()
    res.status(200).json(messages)
  } catch (err) {
    res.status(403).json({ result: false })
  }
}
