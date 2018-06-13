const mysql = require('../../../../../../mysql')
const CONFIG_MYSQL = require('../../../../../../mysql/model')

// GET /api/data/product/domain/:company/:domain
module.exports = async (req, res) => {
  const company = req.params.company
  const domain = req.params.domain

  const getAccount = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT 
        * 
      FROM 
        ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
      WHERE 
        domain = ? 
      AND
        isDeleted != 1
      `
      mysql.query(SQL, [company], (err, rows) => {
        if (err) reject(err)
        if (!rows.length) reject({ msg: 'This account domain is not available.' })

        resolve(rows[0])
      })
    })
  }

  const getProduct = account_id => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT 
        * 
      FROM 
        ${CONFIG_MYSQL.TABLE_PRODUCTS} 
      WHERE 
        account_id = ?
      AND 
        product_domain = ? 
      AND
        isDeleted != 1
      `
      mysql.query(SQL, [account_id, domain], (err, rows) => {
        if (err) reject(err)
        if (!rows.length) reject({ msg: 'This product domain is not available.' })

        resolve(rows[0])
      })
    })
  }

  try {
    const account = await getAccount()
    const account_id = account.account_id || 0
    const product = await getProduct(account_id)
    const result = {
      account,
      product
    }

    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(403).json({ result: false })
  }
}
