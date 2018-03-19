const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// PUT /api/data/account/:id/pdf
module.exports = async (req, res) => {
  const account_id = req.params.account_id
  const { location } = req.files[0]
  const account_data = {
    account_pdf_url: location
  }

  const update = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      UPDATE ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
      SET ?,
      last_modified_date = (SELECT NOW()) 
      WHERE account_id = ${account_id}`, account_data,
        (err) => {
          if (err) reject(err)
          resolve()
        })
    })
  }

  try {
    console.log(4)
    await update()
    console.log(5)
    res.status(200).json({result: true, msg: 'Pdf for company has been updated.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}
