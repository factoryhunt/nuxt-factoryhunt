const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/search/:input/:page
module.exports = async (req, res) => {
  let { input, page } = req.params
  const itemNumber = 15;
  input = input.toLowerCase()
  page = Number(page)
  page = page * itemNumber

  // Accounts
  const getAccounts = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `(SELECT 
        account_id,
        account_name,
        account_status,
        domain,
        products, 
        website, 
        phone,
        established_date,
        mailing_city, 
        mailing_state, 
        mailing_country 
        FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
        WHERE lower(products) LIKE "%${input}%") 
        UNION ALL(
        SELECT 
        lead_id,
        company,
        lead_status, 
        notes,
        products, 
        website, 
        phone, 
        established_date,
        mailing_city, 
        mailing_state, 
        mailing_country 
        FROM ${CONFIG_MYSQL.TABLE_LEADS} 
        WHERE lower(products) LIKE "%${input}%") 
        ORDER BY website > "" DESC, account_name > "" DESC`, (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
    })
  }

  const getAllAccountCount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT (SELECT count(account_id) FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products) LIKE "%${input}%") + (SELECT count(lead_id) FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products) LIKE "%${input}%" ORDER BY number_of_employees) AS count`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0].count)
      })
    })
  }

  const paginate = (accounts) => {
    let tempAccounts = []
    for (var i = 0; i < itemNumber; i++) {
      tempAccounts.push(accounts[page + i])
    }
    return tempAccounts
  }

  try {
    const promise = await Promise.all([
      getAccounts(),
      getAllAccountCount()
    ])
    const accounts = paginate(promise[0])
    res.status(200).json({
      accounts: accounts,
      account_count: promise[1]
    })
  } catch (err) {
    res.status(403).json({result: false})
  }
}
