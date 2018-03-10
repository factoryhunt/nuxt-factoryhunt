const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// PUT /api/data/product/:product_id
module.exports = async (req, res) => {
  const product_id = req.params.product_id

  // promises
  const updateProduct = () => {
    return new Promise((resolve, reject) => {
      const data = {
        product_name,
        product_domain,
        primary_product_category,
        secondary_product_category,
        product_code,
        product_origin,
        item_dimensions,
        material_type,
        minimum_order_quantity,
        product_description
      } = req.body
      mysql.query(`
      UPDATE ${CONFIG_MYSQL.TABLE_PRODUCTS} 
      SET ?, 
      last_modified_date = (SELECT NOW())  
      WHERE product_id = ${product_id}`,
        data, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  const updateImageURL = () => {
    return new Promise((resolve, reject) => {
      let imageData = {}
      if (req.files.image_1) {
        imageData.product_image_url_1 = req.files.image_1[0].location
      }
      if (req.files.image_2) {
        imageData.product_image_url_2 = req.files.image_2[0].location
      }
      if (req.files.image_3) {
        imageData.product_image_url_3 = req.files.image_3[0].location
      }
      if (req.files.image_4) {
        imageData.product_image_url_4 = req.files.image_4[0].location
      }
      if (req.files.image_5) {
        imageData.product_image_url_5 = req.files.image_5[0].location
      }
      if (req.files.pdf) {
        imageData.product_pdf_url = req.files.pdf[0].location
      }
      if (imageData !== {}) {
        mysql.query(`
        UPDATE ${CONFIG_MYSQL.TABLE_PRODUCTS} 
        SET ?,
        last_modified_date = (SELECT NOW())
        WHERE product_id = ${product_id}`, imageData, (err) => {
          if (err) return reject(err)
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  try {
    await updateProduct()
    if (Object.keys(req.files).length !== 0) {
      await updateImageURL()
    }
    res.status(200).json({result: true})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
