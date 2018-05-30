const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// POST /api/data/buying_leads
// In this table, "contact_id" is stored by "author_id"
module.exports = async (req, res) => {
  const { account_id, contact_id } = req.body

  const createNewRecord = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      INSERT INTO
        ${MYSQL_MODELS.TABLE_BUYING_LEADS}
        (account_id, 
          author_id, 
          due_date)
      VALUES
        (${account_id}, 
          ${contact_id},
        DATE_ADD(NOW(), INTERVAL 30 DAY))
      `,
        (err, result) => {
          if (err) reject({ msg: 'Creating new RFQ Failed.', err: err })

          resolve(result.insertId)
        }
      )
    })
  }

  const assignTempDomain = id => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      UPDATE
        ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      SET
        domain = "rfq_${id}",
        last_modified_date = (SELECT NOW())
      WHERE
        buying_lead_id = ${id}`,
        err => {
          if (err) reject({ msg: 'Assigning RFQ Domain Failed.', err: err })
          resolve()
        }
      )
    })
  }

  try {
    const buying_lead_id = await createNewRecord()
    await assignTempDomain(buying_lead_id)
    const result = {
      buying_lead_id: buying_lead_id
    }
    res.status(200).json(result)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
