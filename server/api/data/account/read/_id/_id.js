const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/account/:account_id
// Retrieve single account filtered by product_id
module.exports = async (req, res) => {
  const account_id = req.params.account_id

  const getAccount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT 
      *
      FROM
      ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
      WHERE 
      account_id = ${account_id}`,(err, rows) => {
        if (err) reject(err)
        resolve(rows[0])
      })
    })
  }

  try {
    const account = await getAccount()
    res.status(200).send(account)
  } catch (err) {
    res.status(403).json({result: false})
  }
}
