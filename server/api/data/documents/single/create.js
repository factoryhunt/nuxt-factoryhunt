const mysql = require('../../../mysql')
const TABLE_MODELS = require('../../../mysql/model')
const { onError } = require('../../../../utils/error')

// POST /api/data/documents/single
module.exports = async (req, res) => {
  const { originalname, contentType, size, key, location } = req.file
  const { parent_id, parent_table } = req.body

  const insert = () => {
    const SQL = `
    INSERT INTO
      ${TABLE_MODELS.TABLE_DOCUMENTS}
    (
      parent_id,
      parent_table,
      original_name,
      content_type,
      body_length,
      body_length_compressed,
      location
    )
    VALUES
    (
      ${parent_id},
      "${parent_table}",
      "${originalname}",
      "${contentType}",
      ${size},
      ${size},
      "${location}"
    )
    `

    const SQL_ERROR_MSG = 'Malformed Query'

    return new Promise((resolve, reject) => {
      mysql.query(SQL, (err, result) => {
        if (err) reject(onError(1001, SQL_ERROR_MSG, err))
        resolve(result)
      })
    })
  }

  try {
    const result = await insert()
    res.status(200).json(result)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
