<template>
  <div>
    <div v-show="!isSent">
      <div class="description">
        Enter the email address associated with your account, and we’ll email you a link to reset your password.
      </div>
      <form @submit.prevent="submit()">
        <div class="inputs">
          <text-input 
            class="input"
            placeholder="Email"
            :image="require('~/assets/icons/email.svg')"
            v-model="email"/>
        </div>
        <div class="bottom">
          <a class="back" @click="$emit('showLogin')">Back to Login</a>
          <submit-button
            class="submit"
            :isLoading="isLoading">Send Reset Email</submit-button>
        </div>
      </form>
    </div>
    <div v-show="isSent">
      <div class="description">
        An email to reset your password has been sent to {{email}}. Please check you email.
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import TextInput from '~/components/Inputs/Text'
import SubmitButton from '~/components/Button'
export default {
  components: {
    TextInput,
    SubmitButton
  },
  data: () => ({
    email: '',
    isLoading: false,
    isSent: false
  }),
  methods: {
    async submit() {
      this.$emit('resetError')
      this.isLoading = true
      const payload = {
        email: this.email
      }
      const API = '/api/auth/forgot_password'

      try {
        await axios.post(API, payload)
        this.isLoading = false
        this.isSent = true
      } catch (err) {
        this.$emit('error', err.response.data.err.code)
        this.isLoading = false
        this.isSent = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
.bottom {
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.back {
  display: block;
}
.submit {
  display: block;
}
</style>
