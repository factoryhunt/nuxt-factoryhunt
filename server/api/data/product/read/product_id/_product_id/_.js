const mysql = require('../../../../../mysql')
const CONFIG_MYSQL = require('../../../../../mysql/model')

// GET /api/data/product/product_id/:account_id
module.exports = async (req, res) => {
  const product_id = req.params.product_id

  const getProduct = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE product_id='${product_id}'`,
        (err, rows) => {
          if (err) return reject(err)
          resolve(rows[0])
        })
    })
  }

  try {
    const product = await getProduct()
    res.status(200).json(product)
  } catch (err) {
    res.status(200).json({result: false})
  }
}
