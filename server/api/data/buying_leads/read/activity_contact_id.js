const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// GET /api/data/buying_leads/activity/:contact_id
module.exports = async (req, res) => {
  const { contact_id } = req.params

  const getActivityCount = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        (SELECT 
          COUNT(id) 
        FROM 
          ${MYSQL_MODELS.TABLE_QUOTES} 
        WHERE 
          contact_id = ? AND
          is_deleted != 1) AS quote_count,
        (SELECT 
          COUNT(buying_lead_id) 
        FROM 
          ${MYSQL_MODELS.TABLE_BUYING_LEADS} 
        WHERE 
          author_id = ? AND
          is_deleted != 1) AS request_count
      `
      mysql.query(SQL, [contact_id, contact_id], (err, rows) => {
        if (err) reject(err)

        if (!rows.length) resolve({})

        resolve(rows[0])
      })
    })
  }

  try {
    const counts = await getActivityCount()
    res.status(200).json(counts)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
