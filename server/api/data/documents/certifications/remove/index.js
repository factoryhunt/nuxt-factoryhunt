const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// POST /api/data/documents/certifications/:document_d
module.exports = async (req, res) => {
  const { document_id } = req.params

  const removeDocument = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      UPDATE
      ${CONFIG_MYSQL.TABLE_DOCUMENTS}
      SET
      isDeleted = 1
      WHERE
      document_id = ${document_id}
      `, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  try {
    // await transferDocument()
    await removeDocument()
    res.status(200).json({result: 'certifications true'})
  } catch (err) {
    console.log(err)
    res.status(403).json({result: false})
  }
}
