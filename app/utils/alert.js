exports.topAlert = (store, state, msg) => {
  $(document).ready(() => {
    const $alert = $('#alert')
    store.commit('alert/changeState', {
      alertState: state,
      msg
    })
    $alert.show()
    setTimeout(() => {
      $('.alert-container').hide()
    }, 6000)
  })
}
