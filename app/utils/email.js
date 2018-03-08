import axios from '~/plugins/axios'
import { convertEnterToBrTag } from './text';

export const sendEmail = (data) => {
  return new Promise((resolve, reject) => {
    const {
      email,
      company,
      products,
      domain,
      inquiry,
      subject,
      product
    } = data
    const emailData = {
      email,
      company,
      products,
      domain,
      inquiry: convertEnterToBrTag(inquiry),
      subject,
      product
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
