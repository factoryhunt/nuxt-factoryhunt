export default ({ store, redirect }) => {
  if (!store.state.auth.user) redirect('/login')

  if (!store.state.auth.user.account.account_type) redirect('/signup/step1')
}
