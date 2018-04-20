const mysql = require('../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../mysql/model')

// GET /api/data/account/featured
module.exports = async (req, res) => {
  const getAccountsByRandom = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT * 
      FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS}
      WHERE 
      customer_priority > 2 AND
      cover_image_url_1 != "" AND
      products != "" AND
      account_name != "" AND
      company_short_description != "" AND
      isDeleted != 1
      ORDER BY 
      customer_priority DESC, 
      rand()
      LIMIT 100`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  try {
    const data = await getAccountsByRandom()
    res.status(200).send(data)
  } catch (err) {
    res.status(403).send(err)
  }
}
