import axios from '~/plugins/axios'
import { convertEnterToBrTag } from './text'

export const sendEmail = data => {
  return new Promise((resolve, reject) => {
    const { sender_id, company, products, domain, inquiry, subject, contact_email } = data
    const emailData = {
      sender_id,
      company,
      products,
      domain,
      inquiry: convertEnterToBrTag(inquiry),
      subject,
      contact_email
    }
    axios
      .post('/api/mail/company', emailData)
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}
