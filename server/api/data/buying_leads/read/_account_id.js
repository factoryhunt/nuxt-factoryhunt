const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// GET /api/data/buying_leads/:account_id
module.exports = async (req, res) => {
  const { account_id } = req.params

  const getBuyingLeads = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      SELECT 
        *
      FROM
        ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      WHERE 
        account_id = ${account_id} AND
        is_deleted != 1
      ORDER BY
        last_modified_date DESC
      `,
        (err, results) => {
          if (err) reject(err)
          resolve(results)
        }
      )
    })
  }

  try {
    const buying_leads = await getBuyingLeads()
    res.status(200).json(buying_leads)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
