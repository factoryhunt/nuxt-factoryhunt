const mysql = require('../../mysql')
const MYSQL_MODELS = require('../../mysql/model')
const { infoMailer } = require('../../../middleware/mailer')
const { publishToken } = require('../../../utils/jwt')
const { onError } = require('../../../utils/error')

// POST /api/mail/convert
module.exports = async (req, res) => {
  const { lead_id, inquiry } = req.body

  const getData = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        l.lead_id,
        l.company,
        l.email
      FROM
        ${MYSQL_MODELS.TABLE_LEADS} l
      WHERE
        l.lead_id = ?
      `
      const ERR_QUERY = 'Malformed query.'
      const ERR_NO_LEAD_DATA = 'No lead data.'
      mysql.query(SQL, [lead_id], (err, rows) => {
        if (err) reject(onError(1001, ERR_QUERY, err))

        if (!rows.length) reject(onError(1002, ERR_NO_LEAD_DATA))

        resolve(rows[0])
      })
    })
  }

  const getEmailTemplate = (inquiry, company) => {
    const payload = { lead_id: lead_id }

    const getTemplate = (inquiry, token) => {
      const unsubscribeLink = `https://www.factoryhunt.com/verification?token=${token}`
      const link = `https://www.factoryhunt.com/signup?token=${token}`

      return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> </head> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta name="x-apple-disable-message-reformatting"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> *{text-size-adjust: 100%; -ms-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}html{height: 100%; width: 100%;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; mso-line-height-rule: exactly;}div[style*="margin: 16px 0"]{margin: 0 !important;}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}.ReadMsgBody, .ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div{line-height: 100%;}</style><!--[if gte mso 9]> <style type="text/css"> li{text-indent: -1em;}table td{border-collapse: collapse;}</style><![endif]--> <title>Factoryhunt.com - Share your catalog with us and promote for FREE!</title><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> </head> <body class="body" style="background-color: #FFFFFF; margin: 0; width: 100%;"> <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; position: relative; background-color: #FFFFFF; margin: 0;" bgcolor="#FFFFFF"> <tr> <td class="body__content" align="left" width="100%" valign="top" style="font-size: 16px; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word;"> <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"><!--[if mso | IE]> <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center"> <tr> <td><![endif]--> <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%"> <tr class="container__row"> <td class="container__cell" width="100%" align="left" valign="top"> <div id="body-container" style="margin: 0 auto; padding: 0 20px;"> <p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;">Dear ${company},</p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> We have a message from a buyer interested in your products. Please see the following message and buyer details. If it is interesting, simply signup for a free account with your email by clicking the button below. You will be able to not only contact the buyer but also promote your business to other potential buyers. </p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> Your Company Page on Factory Hunt : <a href="https://www.factoryhunt.com/${domain}" class="a"><span class="a__text">factoryhunt.com/${domain}</span></a> </p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> <strong>Message from Buyer</strong><br/> ${inquiry}</p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> <strong>Buyer Details</strong> <dl style="margin: 0;"> <dt style="margin: 0;">Company</dt> <dd style="font-weight: 300;">${account_name}</dd> <dt style="margin: 0;">Country</dt> <dd style="font-weight: 300;">${mailing_country}</dd> <dt style="margin: 0;">Industry</dt> <dd style="font-weight: 300;">${products_buy}</dd> </dl> </p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> P.S. If you aren't the right person to contact about this, please let me know or here's where you can go to <a href="“${unsubscribeLink}”" class="a"><span class="a__text">unsubscribe.</span></a> </p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;">Best regards,</p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> Factory Hunt C/S Team,<br/> Factory Hunt<br/> B2B Matching Service for Manufacturers, Wholesalers, and buyers </p></div></td></tr></table><!--[if mso | IE]> </td></tr></table><![endif]--> </div></td></tr></table> <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div></body></html>`
    }

    return new Promise(async (resolve, reject) => {
      const ERR_TOKEN = 'Publishing token failed.'

      try {
        const token = await publishToken(payload)
        const template = getTemplate(inquiry, token)
        resolve(template)
      } catch (err) {
        reject(onError(1003, ERR_TOKEN, err))
      }
    })
  }

  const sendMail = async ({ email, company }) => {
    const message = {
      from: 'Factory Hunt <info@factoryhunt.com>',
      to: email,
      bcc: 'info@factoryhunt.com',
      subject: 'You have got a new inquiry from a buyer.',
      html: await getEmailTemplate(inquiry, company)
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
