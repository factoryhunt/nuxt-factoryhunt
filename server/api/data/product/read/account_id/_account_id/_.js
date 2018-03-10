const mysql = require('../../../../../mysql')
const CONFIG_MYSQL = require('../../../../../mysql/model')

// GET /api/data/product/account_id/:account_id
module.exports = async (req, res) => {
  const account_id = req.params.account_id

  const getProducts = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT 
      * 
      FROM 
      ${CONFIG_MYSQL.TABLE_PRODUCTS} 
      WHERE 
      account_id = ${account_id}
      ORDER BY 
      last_modified_date DESC`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  try {
    const products = await getProducts()
    res.status(200).json(products)
  } catch (err) {
    res.status(403).json({result: false})
  }
}
