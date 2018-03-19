const mysql = require('../../../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../../../mysql/model')

// GET /api/data/inbox/_conversation_id/:_conversation_id/:contact_id
module.exports = async (req, res) => {
  const contact_id = req.params.contact_id
  const conversation_id = req.params.conversation_id

  const getConversation = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT 
      ${CONFIG_MYSQL.TABLE_INBOX}.inbox_id,
      ${CONFIG_MYSQL.TABLE_INBOX}.sender_id,
      ${CONFIG_MYSQL.TABLE_INBOX}.recipient_id,
      ${CONFIG_MYSQL.TABLE_INBOX}.conversation_id,
      ${CONFIG_MYSQL.TABLE_INBOX}.body,
      ${CONFIG_MYSQL.TABLE_INBOX}.created_date,
      ${CONFIG_MYSQL.TABLE_CONTACTS}.contact_id,
      ${CONFIG_MYSQL.TABLE_CONTACTS}.first_name,
      ${CONFIG_MYSQL.TABLE_CONTACTS}.last_name,
      ${CONFIG_MYSQL.TABLE_INBOX}.created_date,
      ${CONFIG_MYSQL.TABLE_ACCOUNTS}.account_id,
      ${CONFIG_MYSQL.TABLE_ACCOUNTS}.account_name,
      ${CONFIG_MYSQL.TABLE_ACCOUNTS}.logo_url
      
      FROM 
      ${CONFIG_MYSQL.TABLE_INBOX},
      ${CONFIG_MYSQL.TABLE_CONTACTS},
      ${CONFIG_MYSQL.TABLE_ACCOUNTS}
      WHERE 
      ${CONFIG_MYSQL.TABLE_INBOX}.conversation_id = "${conversation_id}"
      
      AND
      (${CONFIG_MYSQL.TABLE_INBOX}.sender_id = ${CONFIG_MYSQL.TABLE_CONTACTS}.contact_id OR
      ${CONFIG_MYSQL.TABLE_INBOX}.recipient_id = ${CONFIG_MYSQL.TABLE_CONTACTS}.contact_id)
      AND
      ${CONFIG_MYSQL.TABLE_CONTACTS}.contact_id != ${contact_id}
      AND
      ${CONFIG_MYSQL.TABLE_CONTACTS}.account_id = ${CONFIG_MYSQL.TABLE_ACCOUNTS}.account_id
      ORDER BY
      ${CONFIG_MYSQL.TABLE_INBOX}.inbox_id`, (err, rows) => {
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
    res.status(403).json({result: false})
  }
}
