<template>
  <div>
    <form @submit.prevent="signUp()">
      <div class="inputs">
        <text-input 
          class="input"
          placeholder="Email"
          :image="require('~/assets/icons/email.svg')"
          v-model="company"/>
        <text-input 
          class="input"
          placeholder="Email"
          :image="require('~/assets/icons/email.svg')"
          v-model="email"/>
        <text-input 
          class="input"
          type="password"
          placeholder="Password"
          :image="require('~/assets/icons/lock.svg')"
          v-model="password"/>
      </div>
      <div class="help-container">
        <a @click="$emit('showForgotPassword')">Forgot your password?</a>
      </div>
      <submit-button 
        class="submit"
        :isLoading="isLoading">Login</submit-button>
      <div class="footer">
        <span>Do not have Factory Hunt account?</span>
        <a href="/signup">Sign Up</a>
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
  computed: {
    getPayload() {
      return {
        company: this.value.company,
        email: this.value.email,
        password: this.value.password
      }
    }
  },
  methods: {
    async signUp() {
      this.$emit('resetError')
      this.isLoading = true
      this.errorMessage = ''

      const data = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('auth/signUp', data)
        locaton.href = '/signup/step1'
      } catch (err) {
        this.isLoading = false
        this.$emit('error', err.reponse.data)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';

.help-container {
  margin-top: 30px;
  font-size: 14px;
  font-weight: @link-weight;

  @media (min-width: 744px) {
    font-size: 15px;
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
