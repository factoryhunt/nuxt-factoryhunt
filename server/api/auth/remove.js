const mysql = require('../mysql')
const CONFIG_MYSQL = require('../mysql/model')
const { onError } = require('../../utils/error')

// POST /api/auth/remove
module.exports = async (req, res) => {
  const account_id = req.body.account_id || 0
  const contact_id = req.body.contact_id || 0
  const description = req.body.description || ''

  const remove = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      UPDATE
        ${CONFIG_MYSQL.TABLE_ACCOUNTS} a,
        ${CONFIG_MYSQL.TABLE_CONTACTS} c,
        ${CONFIG_MYSQL.TABLE_PRODUCTS} p,
        ${CONFIG_MYSQL.TABLE_BUYING_LEADS} bl,
        ${CONFIG_MYSQL.TABLE_QUOTES} q
      SET
        a.isDeleted = 1,
        c.isDeleted = 1,
        c.notes = CONCAT("${description}.", c.notes),
        p.isDeleted = 1,
        bl.is_deleted = 1,
        q.is_deleted = 1
      WHERE
        c.contact_id = ${contact_id} AND
        a.account_id = ${account_id} AND
        p.account_id = ${account_id} AND
        bl.author_id = ${contact_id} AND
        q.contact_id = ${contact_id}
      `
      const ERR_MSG = 'Malformed remove query.'
      mysql.query(SQL, (err, rows) => {
        if (err) reject(onError(1001, ERR_MSG, err))
        console.log(rows)
        resolve()
      })
    })
  }

  const result = { result: true, msg: 'The account and contact data was deleted successfully.' }

  try {
    await remove()
    res.status(200).json(result)
  } catch (err) {
    console.error(err)
    res.status(401).json({ result: false })
  }
}
