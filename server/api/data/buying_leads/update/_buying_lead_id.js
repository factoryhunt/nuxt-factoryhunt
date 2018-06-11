const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// PUT /api/data/buying_leads/:buying_lead_id
module.exports = async (req, res) => {
  const { buying_lead_id } = req.params
  const { buying_lead_body } = req.body

  const isActivated = buying_lead_body.status === 'Activated'

  const updateBuyingLead = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      UPDATE
        ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      SET
        ?
      WHERE
        buying_lead_id = ${buying_lead_id}`
      mysql.query(SQL, buying_lead_body, err => {
        if (err) reject({ msg: 'Failed to update database', err: err })

        resolve()
      })
    })
  }

  const updateDueDate = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      UPDATE
        ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      SET
        due_date = DATE_ADD(NOW(), INTERVAL 30 DAY)
      WHERE
        buying_lead_id = ${buying_lead_id}`
      mysql.query(SQL, buying_lead_body, err => {
        if (err) reject({ msg: 'Failed to update database', err: err })

        resolve()
      })
    })
  }

  try {
    await updateBuyingLead()
    if (isActivated) await updateDueDate()
    res.status(200).json({ msg: 'Buying lead has been updated successfully.' })
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
