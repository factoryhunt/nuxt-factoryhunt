const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// GET /api/data/buying_leads/:account_id?filter=
// filter = Draft, Activated, Archived,
module.exports = async (req, res) => {
  const { account_id } = req.params

  const getBuyingLeads = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT 
        bl.buying_lead_id,
        bl.status,
        bl.domain,
        bl.category,
        bl.title,
        bl.description,
        bl.quantity,
        bl.unit,
        bl.due_date,
        docs.id, 
        docs.location
      FROM 
        ${MYSQL_MODELS.TABLE_BUYING_LEADS} bl
      LEFT JOIN 
        ${MYSQL_MODELS.TABLE_DOCUMENTS} docs
      ON 
        docs.parent_table = "${MYSQL_MODELS.TABLE_BUYING_LEADS}" AND
        docs.parent_id = bl.buying_lead_id AND
        docs.is_deleted != 1
      WHERE
        bl.account_id = ${account_id} AND
        bl.is_deleted != 1
      GROUP BY 
        bl.buying_lead_id
      ORDER BY
        bl.last_modified_date DESC
      `
      mysql.query(SQL, (err, results) => {
        if (err) reject(err)
        resolve(results)
      })
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
