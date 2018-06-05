import axios from '~/plugins/axios'

export const getAccountByAccountId = account_id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/data/account/${account_id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getContactByContactId = contact_id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/data/contact/${contact_id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getProductByProductId = product_id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/data/product/product_id/${product_id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const uploadDocument = formData => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }

  return new Promise((resolve, reject) => {
    axios
      .post('/api/data/documents/single', formData, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log('err', err)
        resolve(err)
      })
  })
}
