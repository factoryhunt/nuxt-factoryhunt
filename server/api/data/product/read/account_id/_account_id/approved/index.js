const mysql = require('../../../../../../mysql')
const CONFIG_MYSQL = require('../../../../../../mysql/model')

// GET /api/data/product/account_id/:account_id/approved
module.exports = async (req, res) => {
  const account_id = req.params.account_id

  const getApprovedAllProducts = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE account_id = ${account_id} AND product_status = "approved"`,
        (err, rows) => {
          if (err) return reject(err)
          resolve(rows)
        })
    })
  }

  try {
    const products = await getApprovedAllProducts()
    res.status(200).json(products)
  } catch (err) {
    res.status(403).json({result: false})
  }
}
