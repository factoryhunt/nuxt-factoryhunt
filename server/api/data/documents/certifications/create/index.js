const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// POST /api/data/documents/certifications/:account_id
module.exports = async (req, res) => {
  const {
    account_id
  } = req.params
  const file = req.files.certification[0]
  console.log(file)

  // const createDocuments = async () => {
  //   for (const i in files) {
  //     const file = files[i]
  //     await createDocument(file)
  //   }
  // }

  const createDocument = (document) => {
    const data = {
      account_id,
      document_name: document.originalname,
      document_url: document.location,
      document_size: document.size || document.document_size
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
    await createDocument(file)
    res.status(200).json({result: 'certification was uploaded.'})
  } catch (err) {
    console.log(err)
    res.status(403).json({result: false})
  }
}
