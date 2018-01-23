const mysql = require('../../../../../../mysql')
const CONFIG_MYSQL = require('../../../../../../mysql/model')

// POST /api/data/product/:account_id
module.exports = async (req, res, next) => {
  const account_id = req.params.account_id

  const createEmptyRecord = () => {
    return new Promise((resolve, reject) => {
      let data = {}
      data.account_id = account_id
      data.product_status = 'pending'

      mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_PRODUCTS} SET ?`, data, (err, rows) => {
          if (err) reject(err)
          resolve(rows.insertId)
        })
    })
  }

  try {
    const product_id = await createEmptyRecord()
    req.product_id = product_id
    next()
  } catch (err) {
    res.status(403).json({result: false})
  }
}
