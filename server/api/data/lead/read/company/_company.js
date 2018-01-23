const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/lead/company/:company
module.exports = async (req, res) => {
  const company = req.params.company.toLowerCase()

  const getLeads = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(company_english) LIKE "%${company}%"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  try {
    const leads = await getLeads()
    res.status(200).json(leads)
  } catch (err) {
    res.status(403).json({result: false})
  }
}
