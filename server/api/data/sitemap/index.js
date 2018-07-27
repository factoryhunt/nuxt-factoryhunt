const router = require('express').Router()
const mysql = require('../../mysql')

// GET /api/data/sitemap
router.get('/', async (_, res) => {
  const getDomain = () => {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT
        account_id,
        domain
      FROM
        accounts
      WHERE
        isDeleted != 1 AND
        account_status = "approved"
      ORDER BY 
        factory_country != "Korean" DESC
      `

      mysql.query(sql, (err, rows) => {
        if (err) reject(err)

        const sitelinks = rows.map(({ domain }) => {
          return `/${domain}`
        })

        resolve(sitelinks)
      })
    })
  }

  try {
    const domain = await getDomain()
    res.status(200).json(domain)
  } catch (err) {
    console.error(err)
    res.sendStatus(404)
  }
})

module.exports = router
