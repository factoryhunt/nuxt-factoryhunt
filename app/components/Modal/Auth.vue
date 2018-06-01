<template>
  <modal
    :isHidden="isHidden"
    @close="$emit('close')">
    <card 
      title="Login"
      :errorMessage="errorMessage"
      @close="$emit('close')">
      <div>
        <div class="description">
          Please login to use the service.
        </div>
        <!-- Login Form -->
        <form @submit.prevent="onLogin">
          <div class="inputs">
            <text-input 
              class="input"
              placeholder="Email"
              :image="require('~/assets/icons/email.svg')"
              v-model="value.email"/>
            <text-input 
              class="input"
              type="password"
              placeholder="Password"
              :image="require('~/assets/icons/lock.svg')"
              v-model="value.password"/>
          </div>
          <div class="help-container">
            <a>Forgot your password?</a>
          </div>
          <submit-button 
            class="submit"
            :isLoading="toggle.isLoading">Login</submit-button>
          <div class="footer">
            <span>Do not have Factory Hunt account?</span>
            <a href="/signup">Sign Up</a>
          </div>
        </form>
      </div>
    </card>
  </modal>
</template>

<script>
import Modal from './Container'
import Card from '~/components/Card/Modal'
import TextInput from '~/components/Inputs/Text'
import SubmitButton from '~/components/Button'
export default {
  components: {
    Modal,
    Card,
    TextInput,
    SubmitButton
  },
  props: ['isHidden'],
  data: () => ({
    value: {
      company: '',
      email: '',
      password: ''
    },
    errorMessage: '',
    toggle: {
      isLoading: false
    }
  }),
  methods: {
    async onLogin() {
      this.toggle.isLoading = true
      this.errorMessage = ''

      const data = {
        email: this.value.email,
        password: this.value.password
      }

      try {
        await this.$store.dispatch('auth/login', data)
        location.href = this.$route.fullPath
      } catch (err) {
        this.toggle.isLoading = false
        this.setErrMessage(err.data.code)
      }
    },
    setErrMessage(code) {
      switch (code) {
        case 8001:
          this.errorMessage = this.$t('login.8001')
          break
        case 8002:
          this.errorMessage = this.$t('login.8002')
          break
        default:
          this.errorMessage = this.$t('alert.serverError')
          break
      }
    }
  },
  watch: {
    isHidden(isHidden) {
      if (!isHidden) {
        this.toggle.isLoading = false
        this.errorMessage = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

@link-weight: 500;

.modal-background {
  display: block;
}
form {
  font-size: 16px;

  @media (min-width: 744px) {
    font-size: 18px;
  }
}

.description {
  font-size: 15px;

  @media (min-width: 744px) {
    font-size: 16px;
  }
}

.inputs {
  margin-top: 16px;
}
.input {
  margin-top: 8px;
}
.error {
  display: inline-block;
  margin-top: 6px;
  color: @color-red;
  font-weight: 400;
  font-size: 15px;
}
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
