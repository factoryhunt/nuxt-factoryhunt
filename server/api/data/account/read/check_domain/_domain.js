const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/account/check_domain/:domain
module.exports = async (req, res) => {
  let domain = req.params.domain.replace(/"/g, '')

  const getAccount = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
        SELECT 
          account_id,
          domain
        FROM 
          ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
        WHERE 
          domain = "${domain}"
      `
      mysql.query(SQL, (err, rows) => {
        if (err) reject(err)

        if (!rows.length) resolve({ msg: 'This account domain is not taken.' })

        resolve(rows[0])
      })
    })
  }

  try {
    let account = await getAccount()
    res.status(200).json(account)
  } catch (err) {
    console.log('check_domain err', err)
    res.status(403).json(err)
  }
}
