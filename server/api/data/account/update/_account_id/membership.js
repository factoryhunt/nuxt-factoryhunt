const mysql = require('../../../../mysql')

// PUT /api/data/account/:id/membership
module.exports = async (req, res) => {
  const { account_id } = req.params
  const { membership_type, duration } = req.body

  const update = () => {
    return new Promise((resolve, reject) => {
      const sql = `
      UPDATE
        accounts
      SET
        membership_type = ?,
        membership_start_date = (SELECT NOW()),
        membership_valid_until = DATE_ADD(NOW(), INTERVAL ${duration || 0} DAY)
      WHERE 
        account_id = ?
      `
      mysql.query(sql, [membership_type, account_id], err => {
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
