const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')
const { onError } = require('../../../../utils/error')

// DELETE /api/data/quotes/:quote_id
module.exports = async (req, res) => {
  const { quote_id } = req.params

  const remove = () => {
    const SQL = `
    UPDATE
      ${MYSQL_MODELS.TABLE_QUOTES} q
    SET
      is_deleted = 1
    WHERE
      q.id = ?
    `
    const ERR_MSG = 'Deleting quote query is malformed.'

    return new Promise((resolve, reject) => {
      mysql.query(SQL, [quote_id], (err, result) => {
        if (err) reject(onError(1001, err, ERR_MSG))

        resolve(result)
      })
    })
  }

  try {
    await remove()
    res.status(200).json()
  } catch (err) {
    console.log('remove quote err', err)
    res.status(403).json(err)
  }
}
