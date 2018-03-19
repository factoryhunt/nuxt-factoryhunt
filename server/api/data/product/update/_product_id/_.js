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
      let data = {}

      data.product_image_url_1 = req.body.product_image_url_1 ? req.body.product_image_url_1 : ''
      data.product_image_url_2 = req.body.product_image_url_2 ? req.body.product_image_url_2 : ''
      data.product_image_url_3 = req.body.product_image_url_3 ? req.body.product_image_url_3 : ''
      data.product_image_url_4 = req.body.product_image_url_4 ? req.body.product_image_url_4 : ''
      data.product_image_url_5 = req.body.product_image_url_5 ? req.body.product_image_url_5 : ''

      if (req.files.image_0) data.product_image_url_1 = req.files.image_0[0].location
      if (req.files.image_1) data.product_image_url_2 = req.files.image_1[0].location
      if (req.files.image_2) data.product_image_url_3 = req.files.image_2[0].location
      if (req.files.image_3) data.product_image_url_4 = req.files.image_3[0].location
      if (req.files.image_4) data.product_image_url_5 = req.files.image_4[0].location

      if (req.files.pdf) imageData.product_pdf_url = req.files.pdf[0].location

      mysql.query(`
        UPDATE ${CONFIG_MYSQL.TABLE_PRODUCTS} 
        SET ?,
        last_modified_date = (SELECT NOW())
        WHERE product_id = ${product_id}`, data, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  try {
    console.log(1)
    await updateProduct()
    console.log(2)
    await updateImageURL()
    res.status(200).json({result: true})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
