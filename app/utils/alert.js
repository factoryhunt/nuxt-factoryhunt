export const showTopAlert = (store, state, msg) => {
  $(document).ready(() => {

    // Update Vuex Alert Data
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
