const router = require('express').Router()
const mysql = require('../../mysql')
const CONFIG_MYSQL = require('../../mysql/model')

router.get('/', async (req, res) => {
  const getAccount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT domain FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE account_status = "approved"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  const getDomain = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      (SELECT 
      domain, 
      account_status
      FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS}
      WHERE account_status = "approved"
      )
      UNION ALL
      (SELECT
      domain, 
      lead_status
      FROM ${CONFIG_MYSQL.TABLE_LEADS}
      )`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  try {
    const domain = await getDomain()
    res.status(200).json(domain)
  } catch (err) {
    res.status(403).json({})
  }
})

router.get('/domain', async (req, res) => {
  const getLeads = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT lead_id, company, company_english FROM ${CONFIG_MYSQL.TABLE_LEADS}`, (err, rows) => {
        if (err) reject(err)
        console.log('count: ', rows.length)
        resolve(rows)
      })
    })
  }
  const replaceText = (leads) => {
    let temp = []
    for (const i in leads) {
      const company = leads[i].company
      const replacedText = (company).replace(/ /g, '-').toLowerCase().replace(/\./g, '').replace(/\,/g, '').replace(/\(/g, '').replace(/\)/g, '')
      temp.push(replacedText)
    }
    return temp
  }
  const setLeadsDomain = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_LEADS} SET domain`, (err, rows) => {
        if (err) reject(err)
        console.log(rows)
      })
    })
  }

  try {
    const leads = await getLeads()
    const replace = replaceText(leads)
    await setLeadsDomain(replace)
    res.status(200).json(replace)
  } catch (err) {
    console.log(err)
    res.status(403).json({result: false})
  }
})

module.exports = router
