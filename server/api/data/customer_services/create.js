const mysql = require('../../mysql')
const MYSQL_MODELS = require('../../mysql/model')
const { onError } = require('../../../utils/error')

// POST /api/data/customer_services/
module.exports = async (req, res) => {
  const { body } = req.body

  const createCS = () => {
    const SQL = `
    INSERT INTO
    ${MYSQL_MODELS.TABLE_CS}
    SET
    ?
    `
    const ERR_MSG = 'Create customer_service failed'

    return new Promise((resolve, reject) => {
      mysql.query(SQL, body, (err, result) => {
        if (err) reject(onError(1001, err, ERR_MSG))

        resolve()
      })
    })
  }

  try {
    await createCS()
    res.status(200).json({ result: true })
  } catch (err) {
    console.log('create cs err', err)
    res.status(403).json(err)
  }
}
