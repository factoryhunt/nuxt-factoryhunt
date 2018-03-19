const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// PUT /api/data/inbox/message
module.exports = async (req, res) => {
  const {
    message_data
  } = req.body

  const createMessage = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      INSERT INTO
      ${CONFIG_MYSQL.TABLE_INBOX}
      SET ?
      `, message_data, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  try {
    await createMessage()
    res.status(200).json({result: true})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
