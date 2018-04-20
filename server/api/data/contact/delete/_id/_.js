const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// DELETE /api/data/contact/:contact_id
module.exports = async (req, res) => {
  const contact_id = req.params.contact_id

  const removeContact = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      UPDATE
      ${CONFIG_MYSQL.TABLE_CONTACTS}
      SET
      isDeleted = 1,
      last_modified_date = (SELECT NOW())
      WHERE 
      contact_id = ${contact_id}
      `,
        (err) => {
          if (err) return reject(err)
          resolve()
        })
    })
  }

  try {
    await removeContact()
    res.status(200).json({result: true, msg: 'Contact deleted success.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
