const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// PUT /api/data/account/:id
module.exports = async (req, res) => {
  const account_id = req.params.account_id
  const { account_data } = req.body

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
    await update()
    res.status(200).json({result: true, msg: 'Account has been updated.'})
  } catch (err) {
    console.log(err)
    res.status(403).json({result: false})
  }
}
