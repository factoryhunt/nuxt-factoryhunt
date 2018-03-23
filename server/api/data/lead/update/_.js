const mysql = require('../../../mysql')
const CONFIG_MYSQL = require('../../../mysql/model')

module.exports = async (req, res) => {
  const { lead_data } = req.body
  console.log(lead_data)

  const updateLeadData = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      UPDATE 
      ${CONFIG_MYSQL.TABLE_LEADS}
      SET
      ?
      lead_id = ${lead_data.lead_id}`, lead_data, (err) => {
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
