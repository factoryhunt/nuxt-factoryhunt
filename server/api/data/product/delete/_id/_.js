const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// DELETE /api/data/product/:product_id
module.exports = async (req, res) => {
  const product_id = req.params.product_id

  const removeProduct = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      UPDATE 
      ${CONFIG_MYSQL.TABLE_PRODUCTS} 
      SET
      isDeleted = 1
      WHERE product_id = ${product_id}
      `,
        (err) => {
          if (err) reject()
          resolve()
        })
    })
  }

  try {
    await removeProduct()
    res.status(200).json({result: true, msg: 'Product has been deleted successfully.', msg_kor: '제품 삭제 성공.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
