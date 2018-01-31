const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/account/domain/:domain
module.exports = async (req, res) => {
  const domain = req.params.domain

  const getAccount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE domain = "${domain}"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0])
      })
    })
  }

  const getAccountProducts = (account_id) => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE account_id = ${account_id} AND product_status = "approved"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  try {
    let products = null
    let account = await getAccount()
    if (account) products = await getAccountProducts(account.account_id)
    res.status(200).json({
      account: account || null,
      products
    })
  } catch (err) {
    res.status(403).json({result: false})
  }
}
