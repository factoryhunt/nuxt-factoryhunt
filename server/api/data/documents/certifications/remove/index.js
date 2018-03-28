const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// POST /api/data/documents/certifications/:document_d
module.exports = async (req, res) => {
  const {
    document_id
  } = req.params

  const transferDocument = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      INSERT INTO 
      ${CONFIG_MYSQL.TABLE_DOCUMENTS_DELETED} 
      SELECT 
      * 
      FROM ${CONFIG_MYSQL.TABLE_DOCUMENTS} 
      WHERE 
      ${CONFIG_MYSQL.TABLE_DOCUMENTS}.document_id = ${document_id}`,
        (err) => {
          if (err) reject()
          resolve()
        })
    })
  }

  const removeDocument = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      DELETE FROM
      ${CONFIG_MYSQL.TABLE_DOCUMENTS}
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
