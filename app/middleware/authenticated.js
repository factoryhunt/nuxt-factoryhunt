// import axios from 'axios'
//
// // middleware 에선
// export default async ({req, store, redirect}) => {
//   const token = localStorage.getItem('token')
//   console.log('token', token)
//
//   const getAuthentication = () => {
//     return axios.get('/api/auth/check', token)
//   }
//   console.log(getAuthentication())
//   // context.userAgent = context.isServer ? context.req.headers['x-access-token'] : navigator.userAgent
// }
export default ({store, redirect}) => {
  if (!store.state.auth.token) {
    redirect('/login')
  }
}
