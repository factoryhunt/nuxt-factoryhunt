const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// POST /api/data/lead/email/
module.exports = async (req, res) => {
  let { min_lead_id, max_lead_id, lead_ids, lead_filter_type } = req.body

  const getLeadRangeQuerySyntax = () => {
    let queryString

    if (lead_filter_type === 'lead-filter-type-one') {
      queryString = `lead_id >= ${min_lead_id} AND
      lead_id <= ${max_lead_id} AND`
    }

    if (lead_filter_type === 'lead-filter-type-two') {
      tempArray = lead_ids.split(',')

      let tempString = ''
      tempArray.forEach((lead_id, index) => {
        // first index
        if (index === 0) tempString = `(lead_id = ${lead_id}`
        // last index
        else if (index === tempArray.length - 1)
          tempString = `${tempString} OR lead_id = ${lead_id}) AND`
        // between ends
        else tempString = `${tempString} OR lead_id = ${lead_id}`
      })

      queryString = tempString
    }

    return queryString
  }

  const getLeadByLeadId = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
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
        ${getLeadRangeQuerySyntax()}
        email_subscription = "Y" AND
        email > "" AND
        lead_status LIKE "%Open%" AND
        isDeleted != 1
      `,
        (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        }
      )
    })
  }

  try {
    const data = await getLeadByLeadId()
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(403).json({ result: 'false' })
  }
}
