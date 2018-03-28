const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// POST /api/data/documents/certifications/:account_id
module.exports = async (req, res) => {
  const {
    account_id
  } = req.params
  const files = req.files.certifications

  const createDocuments = async () => {
    for (const i in files) {
      const file = files[i]
      await createDocument(file)
    }
  }

  const createDocument = (file) => {
    const data = {
      account_id,
      document_name: file.originalname,
      document_url: file.location
    }
    return new Promise((resolve, reject) => {
      mysql.query(`
      INSERT INTO
      ${CONFIG_MYSQL.TABLE_DOCUMENTS}
      SET ?
      `, data, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  try {
    await createDocuments()
    res.status(200).json({result: 'certifications true'})
  } catch (err) {
    console.log(err)
    res.status(403).json({result: false})
  }
}
