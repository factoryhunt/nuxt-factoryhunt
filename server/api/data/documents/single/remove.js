const mysql = require('../../../mysql')
const TABLE_MODELS = require('../../../mysql/model')
const { onError } = require('../../../../utils/error')

// DELETE /api/data/documents/single
module.exports = async (req, res) => {
  const data = req.body.data || {}
  const document_id = data.id || 0

  const remove = () => {
    const SQL = `
    UPDATE
      ${TABLE_MODELS.TABLE_DOCUMENTS}
    SET
      is_deleted = 1,
      last_modified_date = (SELECT NOW())
    WHERE
      id = ${document_id}
    `

    const ID_ERROR_MSG = 'Document id is not defiend.'
    const SQL_ERROR_MSG = 'Query is malformed.'

    return new Promise((resolve, reject) => {
      if (!document_id) reject(onError(1000, ID_ERROR_MSG))

      mysql.query(SQL, data, (err, result) => {
        if (err) reject(onError(1001, SQL_ERROR_MSG, err))
        resolve(result)
      })
    })
  }

  try {
    const result = await remove()
    res.status(200).json(result)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
