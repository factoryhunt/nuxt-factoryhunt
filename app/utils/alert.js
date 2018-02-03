const store = require('~/store')

exports.topAlert = (state, msg) => {
  $(document).ready(() => {
    const $alert = $('#alert')
    this.$store.commit('alert/changeState', {
      alertState: state,
      msg
    })
    $alert.show()
    setTimeout(() => {
      $('.alert-container').hide()
    }, 6000)
  })
}
