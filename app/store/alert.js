// import cookie from '../../assets/js/cookie'
// import router from '../../router'

export const state = () => ({
  state: null,
  msg: ''
})

export const getters = {
  GET_STATE: state => {
    return state.state
  },
  GET_MSG: state => {
    return state.msg
  }
}

export const mutations = {
  changeState (state, payload) {
    const { alertState, msg } = payload
    state.state = alertState
    if (state.state) {
      state.msg = '<i class="fa fa-check-circle-o" aria-hidden="true"></i> ' + msg
    } else {
      state.msg = '<i class="fa fa-ban" aria-hidden="true"></i> ' + msg
    }
  }
}
