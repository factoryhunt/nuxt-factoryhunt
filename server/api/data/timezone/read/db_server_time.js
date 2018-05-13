const mysql = require('../../../mysql')

// GET /api/data/timezone/db_server_time
module.exports = async (req, res) => {
  const ERR_MSG = 'Fetching Database Server Time Failed.'
  const getDBServerTime = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      SELECT 
      NOW()
      AS 
      "time"
      `,
        (err, results) => {
          if (err) reject({ msg: ERR_MSG, err: err })

          if (!results.length) reject({ msg: ERR_MSG, err: err })

          console.log(results[0].time)
          resolve(results[0].time)
        }
      )
    })
  }

  try {
    const date = await getDBServerTime()
    res.status(200).json(date)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
