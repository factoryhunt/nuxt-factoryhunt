const mysql = require('../../mysql')
const MYSQL_MODELS = require('../../mysql/model')
const { publishToken } = require('../../../utils/jwt')
const { onError } = require('../../../utils/error')
const nodemailer = require('nodemailer')
const config = require('../.config')

module.exports = async (req, res) => {
  const { sender_id, company, products, domain, inquiry, subject, contact_email } = req.body

  const transporter = nodemailer.createTransport(config.info)

  const getSenderData = () => {
    return new Promise((resolve, reject) => {
      const SQL = `
      SELECT
        a.account_id,
        a.account_name,
        a.products_buy,
        a.mailing_country,
        c.contact_id,
        c.contact_email
      FROM
        ${MYSQL_MODELS.TABLE_CONTACTS} c
      LEFT JOIN
        ${MYSQL_MODELS.TABLE_ACCOUNTS} a
      ON
        a.isDeleted != 1 AND
        a.account_id = c.account_id    
      WHERE
        c.isDeleted != 1 AND
        c.contact_id = ?
      `
      const ERR_MSG = 'Malformed Contact Query'
      mysql.query(SQL, sender_id, (err, rows) => {
        if (err) onError(1001, ERR_MSG, err)

        if (!rows.length) reject()

        resolve(rows[0])
      })
    })
  }

  const getEmailTemplate = ({ account_name, mailing_country, products_buy }) => {
    const template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> </head> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta name="x-apple-disable-message-reformatting"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> *{text-size-adjust: 100%; -ms-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}html{height: 100%; width: 100%;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; mso-line-height-rule: exactly;}div[style*="margin: 16px 0"]{margin: 0 !important;}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}.ReadMsgBody, .ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div{line-height: 100%;}</style><!--[if gte mso 9]> <style type="text/css"> li{text-indent: -1em;}table td{border-collapse: collapse;}</style><![endif]--> <title>Factoryhunt.com - Share your catalog with us and promote for FREE!</title><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> </head> <body class="body" style="background-color: #FFFFFF; margin: 0; width: 100%;"> <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; position: relative; background-color: #FFFFFF; margin: 0;" bgcolor="#FFFFFF"> <tr> <td class="body__content" align="left" width="100%" valign="top" style="font-size: 16px; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word;"> <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"><!--[if mso | IE]> <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center"> <tr> <td><![endif]--> <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%"> <tr class="container__row"> <td class="container__cell" width="100%" align="left" valign="top"> <div id="body-container" style="margin: 0 auto; padding: 0 20px;"> <p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;">Dear ${company},</p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> You have received a NEW message from a buyer. Please see the message and buyer details below. Login and reply on the Messages menu if it is interesting. </p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> Your Company Page on Factory Hunt : <a href="https://www.factoryhunt.com/${domain}" class="a"><span class="a__text">factoryhunt.com/${domain}</span></a> </p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> <strong>Message from Buyer</strong><br/> ${inquiry}</p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> <strong>Buyer Details</strong> <dl style="margin: 0;"> <dt style="margin: 0;">Company</dt> <dd style="font-weight: 300;">${account_name}</dd> <dt style="margin: 0;">Country</dt> <dd style="font-weight: 300;">${mailing_country}</dd> <dt style="margin: 0;">Industry</dt> <dd style="font-weight: 300;">${products_buy}</dd> </dl> </p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;">Best regards,</p><p class="text p" style="display: block; margin: 14px 0; line-height: 20px; color: #484848; font-family: 'Helvetica'; word-wrap: break-word; font-size: 15px; font-weight: 300;"> Factory Hunt C/S Team,<br/> Factory Hunt<br/> B2B Matching Service for Manufacturers, Wholesalers, and buyers </p></div></td></tr></table><!--[if mso | IE]> </td></tr></table><![endif]--> </div></td></tr></table> <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div></body></html>`
    return template
  }

  const sendEmail = sender => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: 'Factory Hunt <info@factoryhunt.com>',
        to: contact_email,
        bcc: 'info@factoryhunt.com',
        subject: subject,
        html: getEmailTemplate(sender)
      }
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) reject(err)
        resolve(info)
      })
    })
  }

  try {
    const sender = await getSenderData()
    await sendEmail(sender)
    res.status(200).json({ result: true, msg: 'Email has sent successfully.' })
  } catch (err) {
    res.status(403).json({ result: false })
  }
}
