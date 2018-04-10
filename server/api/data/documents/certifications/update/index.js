const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// PUT /api/data/documents/certifications/
module.exports = async (req, res) => {
  const certifications = req.body.certifications

  const updateDocuments = async () => {
    for (const i in certifications) {
      await updateDocument(certifications[i])
    }
  }

  const updateDocument = (certification) => {
    return new Promise((resolve, reject) => {
      console.log(certification)
      mysql.query(`
      UPDATE
      ${CONFIG_MYSQL.TABLE_DOCUMENTS}
      SET 
      ?,
      last_modified_date = (SELECT NOW())
      WHERE
      document_id = ${certification.document_id}
      `, certification, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  try {
    await updateDocuments()
    res.status(200).json({result: 'certifications true'})
  } catch (err) {
    console.log(err)
    res.status(403).json({result: false})
  }
}
