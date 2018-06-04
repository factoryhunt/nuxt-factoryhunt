const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')
const { onError } = require('../../../../utils/error')

// POST /api/data/quotes/
module.exports = async (req, res) => {
  const { body } = req.body

  const create = () => {
    const SQL = `
    INSERT INTO
    ${MYSQL_MODELS.TABLE_QUOTES}
    SET
    ?
    `
    const ERR_MSG = 'Create quote recored failed.'

    return new Promise((resolve, reject) => {
      mysql.query(SQL, body, (err, result) => {
        if (err) reject(onError(1001, err, ERR_MSG))

        resolve()
      })
    })
  }

  try {
    await create()
    res.status(200).json({ result: true })
  } catch (err) {
    console.log('create quote err', err)
    res.status(403).json(err)
  }
}
