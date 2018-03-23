const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// POST /api/data/lead/email/
module.exports = async (req, res) => {
  let {
    min_lead_id,
    max_lead_id
  } = req.body

  const getLeadByLeadId = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT 
      lead_id,
      email,
      first_name,
      last_name,
      company,
      email_subscription,
      notes 
      FROM 
      ${CONFIG_MYSQL.TABLE_LEADS} 
      WHERE
      lead_id >= ${min_lead_id} AND
      lead_id <= ${max_lead_id} AND
      email_subscription = "Y" AND
      email > "" AND
      lead_status LIKE "%Open%"`, (err, rows) => {
        if (err) reject()
        resolve(rows)
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
