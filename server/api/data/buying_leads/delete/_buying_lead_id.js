const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// DELETE /api/data/buying_leads/:buying_lead_id
module.exports = async (req, res) => {
  const { buying_lead_id } = req.params

  const deleteBuyingLead = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      UPDATE 
      ${MYSQL_MODELS.TABLE_BUYING_LEADS} 
      SET
      isDeleted = 1,
      last_modified_date = (SELECT NOW())
      WHERE 
      buying_lead_id = ${buying_lead_id}
      `,
        err => {
          if (err) reject(err)
          resolve()
        }
      )
    })
  }

  try {
    await deleteBuyingLead()
    const result = {
      msg: 'The buying lead has been deleted successfully.'
    }
    res.status(200).json(result)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
