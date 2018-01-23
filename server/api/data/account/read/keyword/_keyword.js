const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/account/keyword/:keyword
module.exports = async (req, res) => {
  const keyword = req.params.keyword.toLowerCase()

  const getAccounts = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE "%${keyword}%" LIMIT 8`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }
  const getCount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE "%${keyword}%"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0].count)
      })
    })
  }
  const onError = (err) => {
    res.status(403).json({
      result: false,
      msg: err.msg,
      msg_kor: err.msg_kor
    })
  }

  try {
    const promise = await Promise.all([
      getAccounts(),
      getCount()
    ])
    res.status(200).json({
      accounts: promise[0],
      count: promise[1]
    })
  } catch (err) {
    onError(err)
  }
}
