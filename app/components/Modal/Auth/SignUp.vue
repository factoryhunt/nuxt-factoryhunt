<template>
  <div>
    <form @submit.prevent="signUp()">
      <div class="inputs">
        <text-input 
          class="input"
          placeholder="Official Company Name"
          :image="require('~/assets/icons/building.svg')"
          :required="true"
          v-model="company"/>
        <text-input 
          class="input"
          type="email"
          placeholder="Email"
          :required="true"
          :image="require('~/assets/icons/email.svg')"
          v-model="email"/>
        <text-input 
          class="input"
          type="password"
          placeholder="Password"
          :required="true"
          :image="require('~/assets/icons/lock.svg')"
          v-model="password"/>
        <span class="notice">Use at least one letter, one numeral, and eight characters.</span>
      </div>
      <div class="help-container">
        <span>By clicking Create Account, you agree to our <a href="/terms" target="_blank">Terms</a> and that you have read our <a href="privacy" target="_blank">Privacy Policy</a>, including our Cookie Use.</span>
      </div>
      <submit-button 
        class="submit"
        :isLoading="isLoading">Create Account</submit-button>
      <div class="footer">
        <span>Already have a Factory Hunt account?</span>
        <a @click="$emit('showLogin')">Login</a>
      </div>
    </form>
  </div>
</template>

<script>
import TextInput from '~/components/Inputs/Text'
import SubmitButton from '~/components/Button'
export default {
  components: {
    TextInput,
    SubmitButton
  },
  data: () => ({
    company: '',
    email: '',
    password: '',
    isLoading: false
  }),
  methods: {
    async signUp() {
      const { company, email, password } = this
      if (!company || !email || !password) return

      this.$emit('resetError')
      this.isLoading = true

      const data = {
        company,
        email,
        password
      }

      try {
        await this.$store.dispatch('auth/signUp', data)
        alert(this.$t('signUp.signUpSuccess'))
        location.href = '/signup/step1'
      } catch (err) {
        this.isLoading = false
        this.$emit('error', err.response.data.code)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';

.notice {
  font-size: 11px;
  color: @color-font-gray;

  @media (min-width: 744px) {
    font-size: 13px;
  }
}

.help-container {
  margin-top: 30px;
  text-align: center;
  font-size: 12px;
  color: @color-font-gray;

  @media (min-width: 744px) {
    font-size: 14px;
  }
}
.submit {
  width: 100%;
  margin-top: 12px;
}
.footer {
  border-top: 1px solid @color-border-gray;
  margin-top: 14px;
  padding-top: 18px;
  text-align: center;
  font-size: 14px;

  @media (min-width: 744px) {
    font-size: 16px;
  }

  a {
    margin-left: 8px;
    font-weight: @link-weight;
  }
}
</style>
