const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// POST /api/data/history/:contact_id
module.exports = async (req, res) => {
  const { 
    contact_id
  } = req.params

  const insertHistoryRecord = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      INSERT INTO
      ${CONFIG_MYSQL.TABLE_HISTORIES}
      SET
      contact_id = ${contact_id},
      history_type = "login"
      `, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  try {
    await insertHistoryRecord()
    res.status(200).json({result: true})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
