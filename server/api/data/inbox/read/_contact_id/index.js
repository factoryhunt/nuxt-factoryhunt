const mysql = require('../../../../mysql')

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
        l.lead_id,
        l.company AS lead_account_name,
        l.first_name AS lead_first_name,
        l.last_name AS lead_last_name,
        l.contact_title AS lead_contact_title,
        c.first_name,
        c.last_name,
        c.contact_title,
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
        inbox i
      LEFT JOIN
        leads l
      ON
        i.recipient_id = l.lead_id
      LEFT JOIN
        contacts c
      ON
        (i.recipient_id = c.contact_id OR
        i.sender_id = c.contact_id) AND
        c.contact_id != ?
      LEFT JOIN
        accounts a
      ON
        c.account_id = a.account_id
      WHERE
        i.inbox_id IN
        (SELECT
          MAX(inbox_id)
        FROM
          inbox
        WHERE
          i.sender_id = ? OR
          i.recipient_id = ?
        GROUP BY
          conversation_id)
      ORDER BY
        i.created_date DESC
      `
      mysql.query(SQL, [contact_id, contact_id, contact_id], (err, rows) => {
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
