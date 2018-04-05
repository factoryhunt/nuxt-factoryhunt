const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// POST /api/data/lead/:lead_id
module.exports = async (req, res) => {
  const lead_id = parseInt(req.params.lead_id)
  const { lead_data } = req.body
  console.log(lead_data)

  const updateLeadData = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      UPDATE 
      ${CONFIG_MYSQL.TABLE_LEADS}
      SET
      ?, notes = CONCAT(${lead_data.notes}, notes)
      WHERE
      lead_id = ${lead_id}`, lead_data.data, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  try {
    await updateLeadData()
    res.status(200).json({result: true})
  } catch (err) {
    console.log(err)
    res.status(403).json({result: false})
  }
}
