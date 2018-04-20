const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/documents/certifications/:account_id
module.exports = async (req, res) => {
  const {
    account_id
  } = req.params

  const getDocuments = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT
      *
      FROM
      ${CONFIG_MYSQL.TABLE_DOCUMENTS}
      WHERE
      account_id = ${account_id} AND
      isDeleted != 1
      ORDER BY
      last_modified_date DESC
      `, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  try {
    const documents = await getDocuments()
    res.status(200).json(documents)
  } catch (err) {
    console.log(err)
    res.status(403).json({result: false})
  }
}
