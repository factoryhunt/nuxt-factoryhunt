const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/contact/:contact_id
module.exports = async (req, res) => {
  const contact_id = req.params.contact_id

  const getContact = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE contact_id = ${contact_id}`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0])
      })
    })
  }

  try {
    const contact = await getContact()
    res.status(200).json(contact)
  } catch (err) {
    res.status(403).json({result: false})
  }
}
