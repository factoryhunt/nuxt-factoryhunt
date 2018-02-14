const mysql = require('../../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../../mysql/model')

// GET /api/data/lead/keyword/:keyword/:page
module.exports = async (req, res) => {
  const keyword = req.params.keyword.toLowerCase()
  let page = Number(req.params.page)
  page = (page * 10)

  const getLeads = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products) LIKE "%${keyword}%" ORDER BY number_of_employees DESC LIMIT ${page}, 10`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }
  const getCount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products) LIKE "%${keyword}%"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0].count)
      })
    })
  }

  try {
    const promise = await Promise.all([
      getLeads(),
      getCount()
    ])
    res.status(200).json({
      leads: promise[0],
      count: promise[1]
    })
  } catch (err) {
    res.status(403).json({result: false})
  }
}
