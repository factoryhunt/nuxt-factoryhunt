const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/account/featured
module.exports = async (req, res) => {
  const getAccountsById = () => {
    return new Promise((resolve, reject) => {
      let temp_accounts = []
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
      WHERE 
  (account_id = 7) OR 
  (account_id = 10) OR 
  (account_id = 5) OR 
  (account_id = 3) OR 
  (account_id = 4) OR 
  (account_id = 1) OR 
  (account_id = 11) OR 
  (account_id = 6)`, (err, rows) => {
        if (err) reject(err)
        temp_accounts.push(rows[5])
        temp_accounts.push(rows[6])
        temp_accounts.push(rows[3])
        temp_accounts.push(rows[1])
        temp_accounts.push(rows[2])
        temp_accounts.push(rows[0])
        temp_accounts.push(rows[7])
        temp_accounts.push(rows[4])
        resolve(temp_accounts)
      })
    })
  }

  try {
    const data = await getAccountsById()
    res.status(200).send(data)
  } catch (err) {
    res.status(403).send(err)
  }
}
