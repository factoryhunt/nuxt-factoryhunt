<template>
  <div>
    <form @submit.prevent="onResetPasswordButton">
      Reset Password
      <input v-model="value.password" required autocomplete="off" type="password">
      <input v-model="value.confirmPassword" required autocomplete="off" type="password">
      <button>Reset Password</button>
    </form>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  async asyncData({ query, error }) {
    const { token } = query

    try {
      if (!token) throw new Error()
      const { data } = await axios.post('/api/jwt/decode', { token: token })
      return {
        contact_id: data.contact_id
      }
    } catch (err) {
      console.log('reset password error\n', err)
      error({ statusCode: 404, message: 'Your reset password token is not valid.' })
    }
  },
  data() {
    return {
      value: {
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    getPasswords() {
      return {
        new_password: this.value.password,
        new_password_confirm: this.value.confirmPassword
      }
    }
  },
  methods: {
    resetPassword(body) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/api/data/contact/${this.contact_id}/password_change`, { contact_data: body })
          .then(res => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async onResetPasswordButton() {
      try {
        await this.resetPassword(this.getPasswords)
        location.href = '/login'
      } catch (err) {
        console.log('onResetPasswordButton', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
</style>
