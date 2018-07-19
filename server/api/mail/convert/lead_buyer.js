const mysql = require('../../mysql')
const MYSQL_MODELS = require('../../mysql/model')
const { infoMailer } = require('../../../middleware/mailer')
const { publishToken } = require('../../../utils/jwt')
const { onError } = require('../../../utils/error')

// POST /api/mail/lead_buyer
module.exports = async (req, res) => {
  const { temp_author_id, quote_id } = req.body

  const getData = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        l.lead_id,
        l.company,
        l.email,
        q.id as quote_id,
        q.description
      FROM
        ${MYSQL_MODELS.TABLE_LEADS} l,
        ${MYSQL_MODELS.TABLE_QUOTES} q
      WHERE
        l.lead_id = ? AND
        q.id = ?
      `
      const ERR_QUERY = 'Malformed query.'
      const ERR_NO_LEAD_DATA = 'No lead data.'
      mysql.query(SQL, [temp_author_id, quote_id], (err, rows) => {
        if (err) reject(onError(1001, ERR_QUERY, err))

        if (!rows.length) reject(onError(1002, ERR_NO_LEAD_DATA))

        resolve(rows[0])
      })
    })
  }

  const getEmailTemplate = description => {
    const payload = { lead_id: temp_author_id }

    const getTemplate = (quote_description, token) => {
      const link = `https://www.factoryhunt.com/signup?token=${token}`
      const description = quote_description.replace(/\n/g, '<br/>')

      return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="margin: 0; padding: 0;"> <head> </head> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta name="x-apple-disable-message-reformatting"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> *{text-size-adjust: 100%; -ms-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}html{height: 100%; width: 100%;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; mso-line-height-rule: exactly;}div[style*="margin: 16px 0"]{margin: 0 !important;}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}.ReadMsgBody, .ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div{line-height: 100%;}</style><!--[if gte mso 9]> <style type="text/css"> li{text-indent: -1em;}table td{border-collapse: collapse;}</style><![endif]--> <title>You have got a new quote.</title><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> </head> <body class="body" style="padding: 0; background-color: #FFFFFF; margin: 0; width: 100%;"> <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="padding: 0; width: 100%; background-color: #FFFFFF; margin: 0;" bgcolor="#FFFFFF"> <tr style="margin: 0; padding: 0;"> <td class="body__content" align="left" width="100%" valign="top" style="margin: 0; line-height: 20px; color: #484848; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; padding: 20px; text-align: left; word-wrap: break-word;"> <div class="container" style="padding: 0; max-width: 600px; width: 100%; margin: 0;"><!--[if mso | IE]> <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0; margin-right: 0; margin-left: 0;width: 600px" width="600" align="left"> <tr style="margin: 0; padding: 0;"> <td style="margin: 0; padding: 0;"><![endif]--> <table class="container__table" role="presentation" border="0" align="left" cellpadding="0" cellspacing="0" width="100%" style="margin: 0; padding: 0;"> <tr class="container__row" style="margin: 0; padding: 0;"> <td class="container__cell" width="100%" align="left" valign="top" style="margin: 0; padding: 0;"> <div id="container" style="margin: 0; padding: 0;"> <p class="text p" style="display: block; line-height: 20px; padding: 0; color: #484848; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; text-align: left; word-wrap: break-word; margin: 20px 0;">Dear buyer,</p><p class="text p" style="display: block; line-height: 20px; padding: 0; color: #484848; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; text-align: left; word-wrap: break-word; margin: 20px 0;"> You have got a new quote from our website.<br style="margin: 0; padding: 0;"/> Below is the content. </p><p class="content text p" style="display: block; line-height: 20px; padding: 0; color: #484848; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; text-align: left; word-wrap: break-word; margin: 20px 0;"> ${description} </p><p class="text p" style="display: block; line-height: 20px; padding: 0; color: #484848; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; text-align: left; word-wrap: break-word; margin: 20px 0;"> If you want to check more details and contact the supplier, <a href="${link}" target="_blank" class="a" style="padding: 0; margin: 0;"><span class="a__text" style="margin: 0; padding: 0;">click</span></a> this link.</p></div></td></tr></table><!--[if mso | IE]> </td></tr></table><![endif]--> </div></td></tr></table> <div style="margin: 0; padding: 0; display: none; white-space: nowrap; font-size: 15px; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div></body></html>`
    }

    return new Promise(async (resolve, reject) => {
      const ERR_TOKEN = 'Publishing token failed.'

      try {
        const token = await publishToken(payload)
        const template = getTemplate(description, token)
        resolve(template)
      } catch (err) {
        reject(onError(1003, ERR_TOKEN, err))
      }
    })
  }

  const sendMail = async ({ email, description }) => {
    const message = {
      from: 'Factory Hunt <info@factoryhunt.com>',
      to: email,
      bcc: 'info@factoryhunt.com',
      subject: 'You have got a new quote from a supplier.',
      html: await getEmailTemplate(description)
    }

    return new Promise((resolve, reject) => {
      infoMailer.sendMail(message, (err, info) => {
        if (err) reject(err)
        resolve(info)
      })
    })
  }

  try {
    const data = await getData()
    await sendMail(data)
    res.status(200).json({ msg: 'Email has been sent.' })
  } catch (err) {
    console.log(err)
    res.status(403).json(err)
  }
}
