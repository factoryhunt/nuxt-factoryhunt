const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')
const { onError } = require('../../../../utils/error')

// GET /api/data/buying_leads/rqs/:domain
module.exports = async (req, res) => {
  const { domain } = req.params

  const getBuyingLead = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        bl.buying_lead_id,
        bl.account_id,
        bl.status,
        bl.domain,
        bl.category,
        bl.title,
        bl.description,
        bl.quantity,
        bl.unit,
        bl.preferred_unit_price,
        bl.preferred_unit_price_currency,
        bl.delivery_term,
        bl.destination_port,
        bl.payment_type
      FROM
        ${MYSQL_MODELS.TABLE_BUYING_LEADS} bl
      WHERE
        bl.is_deleted != 1 AND
        bl.domain = ?
      `
      const ERR_MSG = 'Malformed Buying Leads Query.'

      mysql.query(SQL, [domain], (err, rows) => {
        if (err) reject(onError(1001, ERR_MSG, err))

        if (!rows.length) resolve(null)

        resolve(rows[0])
      })
    })
  }

  const getDocuments = buying_lead_id => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        id,
        original_name,
        content_type,
        body_length,
        body_length_compressed,
        location
      FROM
        ${MYSQL_MODELS.TABLE_DOCUMENTS}
      WHERE
        parent_table = "buying_leads" AND
        parent_id = ? AND
        is_deleted != 1
      `
      const ERR_MSG = 'Malformed Documents Query.'
      mysql.query(SQL, [buying_lead_id], (err, rows) => {
        if (err) reject(onError(1002, ERR_MSG, err))

        resolve(rows)
      })
    })
  }

  try {
    const buying_lead = await getBuyingLead()
    const documents = await getDocuments(buying_lead.buying_lead_id)
    const payload = {
      buying_lead,
      documents
    }
    res.status(200).json(payload)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
