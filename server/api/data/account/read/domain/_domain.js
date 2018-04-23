const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/account/domain/:domain
module.exports = async (req, res) => {
  const domain = req.params.domain

  const getAccount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT 
      * 
      FROM 
      ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
      WHERE 
      domain = "${domain}" AND
      isDeleted != 1`, (err, rows) => {
        if (err) reject(err)
        if (!rows.length) reject({msg:'This account domain is not available.'})

        resolve(rows[0])
      })
    })
  }

  const getAccountProducts = (account_id) => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT 
      * 
      FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} 
      WHERE 
      account_id = ${account_id} AND 
      product_status = "approved" AND
      isDeleted != 1
      ORDER BY 
      last_modified_date DESC`, (err, rows) => {
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
      account: account,
      products
    })
  } catch (err) {
    console.log(err)
    res.status(403).json({result: false})
  }
}
