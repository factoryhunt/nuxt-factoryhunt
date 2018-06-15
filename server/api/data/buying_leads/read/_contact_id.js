const mysql = require('../../../mysql')
const MYSQL_MODELS = require('../../../mysql/model')

// GET /api/data/buying_leads/:contact_id?filter=
// filter = Draft, Activated, Archived,
module.exports = async (req, res) => {
  const { contact_id } = req.params
  const { filter } = req.query

  const getStatus = () => {
    switch (filter) {
      case 'Draft':
        return 'Draft'
      case 'Activated':
        return 'Activated'
      case 'Archived':
        return 'Archived'
      default:
        return ''
    }
  }

  const getBuyingLeads = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        bl.buying_lead_id,
        bl.author_id,
        bl.status,
        bl.domain,
        bl.category,
        bl.title,
        bl.description,
        bl.quantity,
        bl.unit,
        bl.due_date,
        docs.id as document_id,
        docs.location,
        a.account_name,
        (
        SELECT
	        COUNT(q.id)
        FROM
	        ${MYSQL_MODELS.TABLE_QUOTES} q
        WHERE
          q.buying_lead_id = bl.buying_lead_id) AS quote_count,
        TIMESTAMPDIFF(DAY, now(), bl.due_date) AS due_day_diff,
        TIMESTAMPDIFF(HOUR, now(), bl.due_date) AS due_hour_diff,
        TIMESTAMPDIFF(MINUTE, now(), bl.due_date) AS due_minute_diff
      FROM
        ${MYSQL_MODELS.TABLE_BUYING_LEADS} bl
      LEFT JOIN 
        ${MYSQL_MODELS.TABLE_QUOTES} q
      ON 
        bl.buying_lead_id = q.buying_lead_id
      LEFT JOIN 
        ${MYSQL_MODELS.TABLE_DOCUMENTS} docs
      ON 
        (docs.parent_table = "${MYSQL_MODELS.TABLE_BUYING_LEADS}" AND 
        docs.parent_id = q.buying_lead_id)
      LEFT JOIN
        ${MYSQL_MODELS.TABLE_ACCOUNTS} a
      ON
        bl.account_id = a.account_id
      WHERE 
        (IF ("${getStatus()}" = "", bl.status != "Archived", bl.status = "${getStatus()}") AND
        bl.is_deleted != 1
      AND 
        (
          (q.contact_id = ? AND 
          q.is_deleted != 1)
        OR 
          (bl.author_id = ? AND 
          bl.is_deleted != 1)
        )
      )
      GROUP BY bl.buying_lead_id
      `
      mysql.query(SQL, [contact_id, contact_id], (err, results) => {
        if (err) reject(err)
        resolve(results)
      })
    })
  }

  const getBuyingLeadsCount = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        COUNT(buying_lead_id) as count,
        (SELECT
	        COUNT(buying_lead_id)
        FROM
        	buying_leads
        WHERE
        	account_id = ? AND
        	is_deleted != 1 AND
        	status = "Draft") AS draft_count,
        (SELECT
	        COUNT(buying_lead_id)
        FROM
        	buying_leads
        WHERE
        	account_id = ? AND
        	is_deleted != 1 AND
        	status = "Activated") AS activated_count,
        (SELECT
	        COUNT(buying_lead_id)
        FROM
        	buying_leads
        WHERE
        	account_id = ? AND
        	is_deleted != 1 AND
        	status = "Archived"
        ) AS archived_count
      FROM
        ${MYSQL_MODELS.TABLE_BUYING_LEADS}
      WHERE
        account_id = ? AND
        is_deleted != 1
      `
      mysql.query(SQL, [account_id, account_id, account_id, account_id], (err, rows) => {
        if (err) reject(err)

        if (!rows.length) resolve(0)
        resolve(rows[0])
      })
    })
  }

  try {
    const promise = await Promise.all([getBuyingLeads()])

    const result = {
      buying_leads: promise[0]
    }

    res.status(200).json(result)
  } catch (err) {
    console.log('err', err)
    res.status(403).json(err)
  }
}
