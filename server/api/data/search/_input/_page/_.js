const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')
// const synonyms = require('synonyms')

// GET /api/data/search/:input/:page
module.exports = async (req, res) => {
  let {
    input,
    page
  } = req.params
  const itemNumber = 15;
  input = input.toLowerCase()
  page = Number(page)
  page = page * itemNumber

  // let inputRegexp = ''
  //
  // const syns = synonyms(input, 'n')
  // // console.log(syns)
  // if (syns) {
  //   for (const i in syns) {
  //     inputRegexp = inputRegexp + `|${syns[i]}`
  //   }
  //   inputRegexp = inputRegexp.substring(1)
  // } else {
  //   inputRegexp = input
  // }

  // console.log('inputRegexp', inputRegexp)

  // Accounts
  const getAccounts = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `(SELECT 
        account_id,
        account_name,
        number_of_employees, 
        billing_country,
        account_status,
        domain,
        products,
        company_description, 
        website, 
        phone,
        established_year,
        mailing_city, 
        mailing_state, 
        mailing_country 
        FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
        WHERE 
        lower(products) regexp "${input}" 
        AND account_status = "approved"
        ) 
        UNION ALL(
        SELECT 
        lead_id,
        company,
        number_of_employees,
        languages,
        lead_status, 
        domain,
        products, 
        company_description,
        website, 
        phone, 
        established_date,
        mailing_city, 
        mailing_state, 
        mailing_country 
        FROM ${CONFIG_MYSQL.TABLE_LEADS} 
        WHERE lower(products) regexp "${input}"
        )
        ORDER BY 
        account_status = "approved" DESC, 
        billing_country = "Korean", 
        website > "" DESC, 
        company_description > "" DESC`, (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
    })
  }

  // const getAllAccountCount = () => {
  //   return new Promise((resolve, reject) => {
  //     mysql.query(`
  //     SELECT
  //     (SELECT count(account_id) FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products) regexp "${inputRegexp}")
  //     +
  //     (SELECT count(lead_id) FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products) regexp "${inputRegexp}")
  //     AS count`, (err, rows) => {
  //       if (err) reject(err)
  //       resolve(rows[0].count)
  //     })
  //   })
  // }

  const paginate = (accounts) => {
    let tempAccounts = []
    for (var i = 0; i < itemNumber; i++) {
      tempAccounts.push(accounts[page + i])
    }
    return tempAccounts
  }

  try {
    const promise = await Promise.all([
      getAccounts()
    ])
    const accounts = paginate(promise[0])
    res.status(200).json({
      accounts: accounts,
      account_count: promise[0].length
    })
  } catch (err) {
    res.status(403).json({result: false})
  }
}
