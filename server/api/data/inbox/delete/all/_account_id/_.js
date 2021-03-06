const mysql = require('../../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../../mysql/model')

// DELETE /api/data/product/all/:contact_id
module.exports = async (req, res) => {
  const account_id = req.params.account_id

  const removeAllProducts = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`DELETE FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE account_id = ${account_id}`,
        (err) => {
          if (err) return reject(err)
          resolve()
        })
    })
  }

  try {
    await removeAllProducts()
    res.status(200).json({result: true, msg:'All products have been removed successfully.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
