const mysql = require('../../../mysql')
const CONFIG_MYSQL = require('../../../mysql/model')

// GET /api/data/search/:input
module.exports = async (req, res) => {
  let { input } = req.params
  input = input.toLowerCase()

  // Products
  const getProducts = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE lower(product_name) LIKE "%${input}%" AND product_status = "approved" LIMIT 8`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }
  const getProductCount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE lower(product_name) LIKE "%${input}%" AND product_status = "approved"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0].count)
      })
    })
  }

  // Accounts
  const getAccounts = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `(SELECT 
account_id,
account_name,
account_name_english,
account_status,
domain,
products_english, 
website, 
phone,
established_date,
mailing_city_english, 
mailing_state_english, 
mailing_country_english FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE "%${input}%" limit 3) UNION ALL
 (SELECT 
 lead_id,
 company,
 company_english,
 lead_status, 
 notes,
 products_english, 
 website, 
 phone, 
 established_date,
 mailing_city_english, 
 mailing_state_english, 
 mailing_country_english FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products_english) LIKE "%${input}%" ORDER BY number_of_employees DESC limit 7)`, (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
    })
  }

  const getAccountCount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT (SELECT count(account_id) FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE "%${input}%") + (SELECT count(lead_id) FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products_english) LIKE "%${input}%" ORDER BY number_of_employees) AS count`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0].count)
      })
    })
  }

  try {
    const promise = await Promise.all([
      getProducts(),
      getProductCount(),
      getAccounts(),
      getAccountCount()
    ])
    res.status(200).json({
      products: promise[0],
      product_count: promise[1],
      accounts: promise[2],
      account_count: promise[3]
    })
  } catch (err) {
    res.status(403).json({result: false})
  }
}
