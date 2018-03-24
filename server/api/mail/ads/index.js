const mysql = require('../../mysql')
const CONFIG_MYSQL = require('../../mysql/model')
const { infoMailer } = require('../../../middleware/mailer')
const { publishToken } = require('../../../utils/jwt')

// POST /api/mail/ads
module.exports = async (req, res) => {
  let {
    min_lead_id,
    max_lead_id
  } = req.body

  const getName = (lead) => {
    return lead.first_name ? `${lead.first_name} ${lead.last_name}` : 'Sir/Madam'
  }

  const getLeads = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT
      lead_id,
      email,
      first_name,
      last_name,
      company,
      email_subscription,
      notes
      FROM
      ${CONFIG_MYSQL.TABLE_EMAILS}
      WHERE
      lead_id >= ${min_lead_id} AND
      lead_id <= ${max_lead_id} AND
      email_subscription = "Y" AND
      email > "" AND
      lead_status LIKE "%Open%"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  const postEmails = async (leads) => {
    console.log('post emails starts')
    for (const index in leads) {
      const payload = {
        lead_id: leads[index].lead_id,
        email: leads[index].email
      }
      const token = await publishToken(payload)
      const info = await postMail(token, leads[index].email, getName(leads[index]))
      console.log(info)
      await updateLeadDatabase(leads[index].lead_id)
    }

    console.log('post Emails done')
  }

  const postMail = (token, email, name) => {
    const link = `//${req.get('host')}/verification/unsubscribe?token=${token}`
    const message = {
      from: 'info@factoryhunt.com',
      to: email,
      subject: 'Factoryhunt.com - Share your catalog with us and promote for FREE!',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> </head> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta name="x-apple-disable-message-reformatting"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> *{text-size-adjust: 100%; -ms-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}html{height: 100%; width: 100%;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; mso-line-height-rule: exactly;}div[style*="margin: 16px 0"]{margin: 0 !important;}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}.ReadMsgBody, .ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div{line-height: 100%;}</style><!--[if gte mso 9]> <style type="text/css"> li{text-indent: -1em;}table td{border-collapse: collapse;}</style><![endif]--> <title>Factoryhunt.com - Share your catalog with us and promote for FREE!</title><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> </head> <body class="body" style="background-color: #FFFFFF; margin: 0; width: 100%;"> <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; position: relative; background-color: #FFFFFF; margin: 0;" bgcolor="#FFFFFF"> <tr> <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; word-wrap: break-word;"> <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"><!--[if mso | IE]> <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center"> <tr> <td><![endif]--> <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%"> <tr class="container__row"> <td class="container__cell" width="100%" align="left" valign="top"> <div id="body-container" style="margin: 0 auto; padding: 0 20px;"> <p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; word-wrap: break-word; color: #484848;">Dear ${name},</p><p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; word-wrap: break-word; color: #484848;">Factory Hunt is a global hub of manufacturer & supplier listings. <br/><span class="bold underline" style="text-decoration: underline; font-weight: 600;">We made the service to help suppliers discover new business opportunities.</span> <br/>You could simply upload your PDF catalog on factoryhunt.com and promote your business to potential buyers for FREE! <br/>Please feel free to directly contact me if you have any questions regarding the service. Thank you for your time. </p><p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; word-wrap: break-word; color: #484848;"> Website: <a href="https://www.factoryhunt.com" target="_blank" class="a"><span class="a__text">https://www.factoryhunt.com<br/></span></a> Service details: <a href="https://www.factoryhunt.com/for-supplier" target="_blank" class="a"><span class="a__text">https://www.factoryhunt.com/for-supplier<a href="#" class="a"><span class="a__text"> </span></a> </span> </a> </p><p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; word-wrap: break-word; color: #484848;"> Sample supplier profile: <a href="https://www.factoryhunt.com/samplecompany" target="_blank" class="a"><span class="a__text">https://www.factoryhunt.com/samplecompany</span></a> Sample online product catalog: <a href="https://www.factoryhunt.com/samplecompany/LED-Street-Light" target="_blank" class="a"><span class="a__text">https://www.factoryhunt.com/samplecompany/LED-Street-Light</span></a> </p><p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; word-wrap: break-word; color: #484848;"> P.S. If you aren't the right person to contact about this, please let me know or here's where you can go to <a href="${link}" class="a"><span class="a__text">unsubscribe.</span></a> </p><p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; word-wrap: break-word; color: #484848;">Best regards,</p><p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; word-wrap: break-word; color: #484848;"> Daniel Jeong<br/> CEO </p></div></td></tr></table><!--[if mso | IE]> </td></tr></table><![endif]--> </div></td></tr></table> <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div></body></html>`
    }

    return new Promise((resolve, reject) => {
      infoMailer.sendMail(message, (err, info) => {
        if (err) reject(err)
        resolve(info)
      })
    })
  }

  const updateLeadDatabase = (lead_id) => {
    const date = new Date()
    const data = {
      notes: `${date} - Sent Ads email`
    }

    return new Promise((resolve, reject) => {
      mysql.query(`
      UPDATE
      ${CONFIG_MYSQL.TABLE_LEADS}
      SET
      ?
      WHERE
      lead_id = ${lead_id}`, data, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  try {
    const leads = await getLeads()
    console.log(leads)
    await postEmails(leads)
    res.json({msg: 'Email has been sent!'})
  } catch (err) {
    console.log(err)
    res.json({msg: 'Email sending rejected..'})
  }
}
