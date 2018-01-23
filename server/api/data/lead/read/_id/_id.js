const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/lead/:lead_id
module.exports = async (req, res) => {
  const lead_id = req.params.lead_id

  const getLeadByLeadId = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lead_id = ${lead_id}`, (err, rows) => {
        if (err) reject()
        resolve(rows[0])
      })
    })
  }

  try {
    const data = await getLeadByLeadId()
    res.status(200).json(data)
  } catch (err) {
    res.status(403).json({result: 'false'})
  }
}
