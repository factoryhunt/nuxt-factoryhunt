const mysql = require('../../../../mysql')

// PUT /api/data/account/:id
module.exports = async (req, res) => {
  const { account_id } = req.params
  const { account_data } = req.body

  const update = () => {
    return new Promise((resolve, reject) => {
      const sql = `
      UPDATE
        accounts
      SET
        ?
      WHERE 
        account_id = ?
      `
      mysql.query(sql, [account_data, account_id], err => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  try {
    await update()
    res.status(200).json({ result: true, msg: 'Account has been updated.' })
  } catch (err) {
    console.log(err)
    res.status(403).json({ result: false })
  }
}
