export const state = () => ({ isProduction: process.env.NODE_ENV.indexOf('production') !== -1 })

export const getters = {
  GET_NODE_ENV: state => {
    return state.isProduction
  }
}
