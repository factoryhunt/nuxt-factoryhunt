const mysql = require('../../../../../mysql')
const CONFIG_MYSQL = require('../../../../../mysql/model')

// GET /api/data/product/keyword/:keyword
module.exports = async (req, res) => {
  const keyword = req.params.keyword.toLowerCase()
  const products = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE lower(product_name) LIKE "%${keyword}%" AND product_status = "approved" LIMIT 8`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }
  const count = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE lower(product_name) LIKE '%${keyword}%' AND product_status = "approved"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0].count)
      })
    })
  }

  try {
    const promise = await Promise.all([
      products(),
      count()
    ])
    res.status(200).json({
      products: promise[0],
      count: promise[1]
    })
  } catch (err) {
    res.status(200).json({result: false})
  }
}
