const mysql = require('../../../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../../../mysql/model')

// GET /api/data/inbox/_conversation_id/:_conversation_id/:contact_id
module.exports = async (req, res) => {
  const contact_id = req.params.contact_id
  const conversation_id = req.params.conversation_id

  const getConversation = () => {
    const SQL = `
      SELECT 
        i.inbox_id,
        i.sender_id,
        i.recipient_id,
        i.conversation_id,
        i.body,
        i.created_date,
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
        i.conversation_id = "${conversation_id}"
      AND
        (i.sender_id = c.contact_id OR
        i.recipient_id = c.contact_id)
      AND
        c.contact_id = i.sender_id
      AND
        c.account_id = a.account_id
      ORDER BY
        i.inbox_id
      `
    return new Promise((resolve, reject) => {
      mysql.query(SQL, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  try {
    const conversation = await getConversation()
    console.log('api returns', conversation)
    res.status(200).json(conversation)
  } catch (err) {
    res.status(403).json({
      result: false
    })
  }
}