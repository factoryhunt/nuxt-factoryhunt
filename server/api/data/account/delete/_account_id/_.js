const mysql = require('../../../../mysql')
const CONFIG_MYSQL = require('../../../../mysql/model')

// DELETE /api/data/account/:contact_id
module.exports = async (req, res) => {
  const id = req.params.account_id

  // const transferAccount = (id) => {
  //   return new Promise((resolve, reject) => {
  //     mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_ACCOUNTS_DELETED} SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE ${CONFIG_MYSQL.TABLE_ACCOUNTS}.account_id = ${id}`,
  //       (err) => {
  //         if (err) return reject(err)
  //         resolve()
  //       })
  //   })
  // }

  const removeAccount = (id) => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      UPDATE
      ${CONFIG_MYSQL.TABLE_ACCOUNTS} 
      SET
      isDeleted = 1,
      last_modified_date = (SELECT NOW())
      WHERE 
      account_id = ${id}`,
        (err) => {
          if (err) return reject(err)
          resolve()
        })
    })
  }
  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'Account deleted success.'
    })
  }
  const onError = () => {
    res.status(403).json({
      result: false,
      msg: 'Removing account failed'
    })
  }

  try {
    await removeAccount(id)
    onSuccess()
  } catch (err) {
    onError()
  }
}
