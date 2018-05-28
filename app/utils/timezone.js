import axios from '~/plugins/axios'

export const getServerTime = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/data/timezone/db_server_time')
      .then(res => {
        const time = res.data
        resolve(time)
      })
      .catch(err => {
        console.log('err', err)
        reject(err)
      })
  })
}
