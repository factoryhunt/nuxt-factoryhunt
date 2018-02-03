const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// DELETE /api/data/product/:product_id
module.exports = async (req, res) => {
  const product_id = req.params.product_id

  const transferProduct = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_PRODUCTS_DELETED} SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE ${CONFIG_MYSQL.TABLE_PRODUCTS}.product_id = ${product_id}`,
        (err) => {
          if (err) reject()
          resolve()
        })
    })
  }

  const removeProduct = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`DELETE FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE product_id = ${product_id}`,
        (err) => {
          if (err) reject()
          resolve()
        })
    })
  }

  try {
    console.log(1)
    await transferProduct()
    console.log(2)
    await removeProduct()
    console.log(3)
    res.status(200).json({result: true, msg: 'Product has been deleted successfully.', msg_kor: '제품 삭제 성공.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
