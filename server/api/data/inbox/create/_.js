const mysql = require('../../../mysql')
const CONFIG_MYSQL = require('../../../mysql/model')

// POST /api/data/inbox/
module.exports = async (req, res) => {
  const { body } = req.body

  const createMessage = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      INSERT INTO
        ${CONFIG_MYSQL.TABLE_INBOX}
      SET 
        ?
      `
      mysql.query(SQL, body, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }

  try {
    const result = await createMessage()
    res.status(200).json(result)
  } catch (err) {
    res.status(403).json({ result: false })
  }
}
