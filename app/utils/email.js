import axios from '~/plugins/axios'
import { convertEnterToBrTag } from './text';

export const sendEmail = (data) => {
  return new Promise((resolve, reject) => {
    const { email, company, inquiry, subject, product, pid } = data
    const emailData = {
      email,
      company,
      inquiry: convertEnterToBrTag(inquiry),
      subject,
      product,
      pid
    }
    axios.post('/api/mail/company', emailData)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}
