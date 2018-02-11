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
  try {
    const domain = await getAccount()
    res.status(200).json(domain)
  } catch (err) {
    res.status(403).json({})
  }
})

module.exports = router
