const mysql = require('../../../../../mysql')
const CONFIG_MYSQL = require('../../../../../mysql/model')

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
        i.created_date,
        a.account_id,
        a.account_name,
        a.logo_url
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
    res.status(403).json({result: false})
  }
}
