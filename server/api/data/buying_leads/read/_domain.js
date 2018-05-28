const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')
const { onError } = require('../../../../utils/error')

// GET /api/data/buying_leads/domain/:domain
module.exports = async (req, res) => {
  const { domain } = req.params

  const getBuyingLead = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        buying_lead_id,
        account_id,
        author_id,
        status,
        domain,
        category,
        title,
        description,
        quantity,
        unit,
        duration,
        preferred_unit_price,
        preferred_unit_price_currency,
        delivery_term,
        destination_port,
        payment_type,
        created_date,
        last_modified_date
      FROM
        ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      WHERE 
        domain = "${domain}" AND
        is_deleted != 1
      `
      const ERROR_MSG = 'Malformed Buying Leads Query.'

      mysql.query(SQL, (err, results) => {
        if (err) reject(onError(1001, ERR_MSG, err))

        if (!results.length) resolve(null)

        resolve(results[0])
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
        parent_id = ${buying_lead_id} AND
        is_deleted != 1
      `
      const ERROR_MSG = 'Malformed Documents Query.'

      mysql.query(SQL, (err, results) => {
        if (err) reject(onError(1002, ERROR_MSG, err))
        if (!results.length) resolve([])

        resolve(results)
      })
    })
  }

  try {
    const buying_lead = await getBuyingLead()
    const documents = await getDocuments(buying_lead.buying_lead_id)
    const result = {
      buying_lead,
      documents
    }
    res.status(200).json(result)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
