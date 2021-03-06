const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// PUT /api/data/contact/:contact_id
module.exports = async (req, res) => {
  const contact_id = req.params.contact_id
  const { contact_data } = req.body

  const update = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      UPDATE 
      ${CONFIG_MYSQL.TABLE_CONTACTS} 
      SET 
      ?,
      notes = CONCAT("${contact_data.notes || ''}", notes),
      last_modified_date = (SELECT NOW()) 
      WHERE 
      contact_id = ${contact_id}
      `,
        contact_data,
        err => {
          if (err) reject(err)
          resolve()
        }
      )
    })
  }

  try {
    await update()
    res
      .status(200)
      .json({ result: true, msg: 'Contact information has been updated successfully.' })
  } catch (err) {
    res.status(200).json({ result: false })
  }
}
