const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/lead/company/:company
module.exports = async (req, res) => {
  const company = req.params.company.toLowerCase()

  const getLead = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE domain = "${company}"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0])
      })
    })
  }

  try {
    const lead = await getLead()
    res.status(200).json(lead)
  } catch (err) {
    res.status(403).json({result: false})
  }
}
