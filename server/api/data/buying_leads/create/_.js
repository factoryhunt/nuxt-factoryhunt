const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// POST /api/data/buying_leads
// In this table, "contact_id" is stored by "author_id"
module.exports = async (req, res) => {
  const { account_id, contact_id } = req.body

  const createNewRecord = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      INSERT INTO
      ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      (account_id, author_id)
      VALUES
      (${account_id}, ${contact_id})
      `,
        (err, result) => {
          if (err) reject(err)

          const insert_id = result.insertId
          resolve(insert_id)
        }
      )
    })
  }

  try {
    const buying_lead_id = await createNewRecord()
    const result = {
      buying_lead_id: buying_lead_id
    }
    res.status(200).json(result)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
