const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// PUT /api/data/buying_leads/:buying_lead_id
module.exports = async (req, res) => {
  const { buying_lead_id } = req.params
  const { buying_lead_body } = req.body

  const updateBuyingLead = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      UPDATE
        ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      SET
        ?,
        last_modified_date = (SELECT NOW())
      WHERE
        buying_lead_id = ${buying_lead_id}`,
        buying_lead_body,
        err => {
          if (err) reject({ msg: 'Failed to update database', err: err })

          resolve()
        }
      )
    })
  }

  try {
    await updateBuyingLead()
    res.status(200).json({ msg: 'Buying lead has been updated successfully.' })
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
