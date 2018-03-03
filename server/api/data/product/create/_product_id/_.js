const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

module.exports = async (req, res) => {
  const product_id = req.product_id

  const updateTextData = () => new Promise((resolve, reject) => {
    console.log(req.body)
    let data = {
      product_name,
      product_domain,
      product_code,
      product_image_url_1,
      primary_product_category,
      secondary_product_category,
      product_origin,
      item_dimensions,
      material_type,
      minimum_order_quantity,
      product_description
    } = req.body

    mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_PRODUCTS} SET ? WHERE product_id = ${product_id}`, data,
      (err) => {
        if (err) return reject(err)
        resolve()
      })
  })

  const updateImageUrl = () => new Promise((resolve, reject) => {
    const product_id = req.product_id
    let imageData = {}

    for (let i = 0; i < req.files.images.length; i++) {
      if (i === 0) {
        imageData.product_image_url_1 = req.files.images[i].location
      }
      if (i === 1) {
        imageData.product_image_url_2 = req.files.images[i].location
      }
      if (i === 2) {
        imageData.product_image_url_3 = req.files.images[i].location
      }
      if (i === 3) {
        imageData.product_image_url_4 = req.files.images[i].location
      }
      if (i === 4) {
        imageData.product_image_url_5 = req.files.images[i].location
      }
    }
    if (req.files.pdf) {
      imageData.product_pdf_url = req.files.pdf[0].location
    }
    mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_PRODUCTS} SET ? WHERE product_id = ${product_id}`, imageData,
      (err) => {
        if (err) reject(err)
        resolve()
      })
  })

  try {
    await updateTextData()
    await updateImageUrl()
    res.status(200).json({result: true})
  } catch (err) {
    res.status(403).json({result: false})
  }
}

