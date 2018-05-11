export default ({ store, redirect }) => {
  console.log('isBuyer middleware called')

  const user = store.getters['auth/GET_USER']
  if (!user) redirect('/login')

  const account = store.getters['auth/GET_ACCOUNT']
  const account_type = account.account_type

  // if (account_type.indexOf('Buyer') !== 0) redirect('/')
}
