const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// DELETE /api/data/contact/:contact_id
module.exports = async (req, res) => {
  const contact_id = req.params.contact_id

  const transferContact = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_CONTACTS_DELETED} SELECT * FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE ${CONFIG_MYSQL.TABLE_CONTACTS}.contact_id = ${contact_id}`,
        (err) => {
          if (err) return reject(err)
          resolve()
        })
    })
  }

  const removeContact = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`DELETE FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE contact_id = ${contact_id}`,
        (err) => {
          if (err) return reject(err)
          resolve()
        })
    })
  }

  try {
    await transferContact()
    await removeContact()
    res.status(200).json({result: true, msg: 'Contact deleted success.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
