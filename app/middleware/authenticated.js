export default ({store, redirect}) => {
  if (!store.state.auth.user) redirect('/login')
}
