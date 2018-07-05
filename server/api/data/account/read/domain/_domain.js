const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/account/domain/:domain
module.exports = async (req, res) => {
  let domain = req.params.domain.replace(/"/g, '')

  const getAccount = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        a.*,
        c.contact_id,
        c.contact_email
      FROM
        ${CONFIG_MYSQL.TABLE_ACCOUNTS} a,
        ${CONFIG_MYSQL.TABLE_CONTACTS} c
      WHERE
        a.isDeleted != 1 AND
        c.isDeleted != 1 AND
        a.domain = ? AND
        c.account_id = a.account_id AND
        c.contact_level = 1 
      `
      mysql.query(SQL, [domain], (err, rows) => {
        if (err) reject(err)
        if (!rows.length) resolve()

        resolve(rows[0])
      })
    })
  }

  const getAccountProducts = account_id => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT 
        * 
      FROM 
        ${CONFIG_MYSQL.TABLE_PRODUCTS} 
      WHERE 
        account_id = ?
      AND 
        product_status = "approved" 
      AND
        isDeleted != 1
      ORDER BY 
        last_modified_date DESC
      `
      mysql.query(SQL, [account_id], (err, rows) => {
        if (err) reject(err)

        resolve(rows)
      })
    })
  }

  try {
    let products = null
    let account = await getAccount()
    if (account) products = await getAccountProducts(account.account_id)
    res.status(200).json({
      account: account,
      products
    })
  } catch (err) {
    console.log(err)
    res.status(403).json({ result: false })
  }
}
