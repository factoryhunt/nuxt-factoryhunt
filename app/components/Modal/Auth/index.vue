<template>
  <modal
    :isHidden="isHidden"
    @close="$emit('close')">
    <card 
      :title="currentTitle"
      :errorMessage="errorMessage"
      @close="$emit('close')">
      <div>
        <!-- Login Form -->
        <login
          v-if="isStatusLogin"
          @resetError="resetError"
          @showForgotPassword="changeStatus('forgot')"
          @error="setErrMessage"/>
        <!-- Forgot Password Form -->
        <forgot-password
          v-if="isStatusForgot"
          @resetError="resetError"
          @showLogin="changeStatus('login')"
          @error="setErrMessage"/>
      </div>
    </card>
  </modal>
</template>

<script>
import Modal from '../Container'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import Card from '~/components/Card/Modal'
export default {
  components: {
    Modal,
    Card,
    Login,
    ForgotPassword
  },
  props: ['isHidden', 'status'],
  data: () => ({
    currentStatus: 'login',
    currentTitle: 'Login',
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
  computed: {
    isStatusLogin() {
      return this.currentStatus === 'login'
    },
    isStatusForgot() {
      return this.currentStatus === 'forgot'
    }
  },
  methods: {
    resetError() {
      this.errorMessage = ''
    },
    setErrMessage(code) {
      console.log(code)
      switch (code) {
        case 7002:
          this.errorMessage = 'The email does not exist.'
          break
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
    },
    changeStatus(status) {
      if (status === 'login') {
        this.currentStatus = 'login'
        this.currentTitle = 'Login'
      } else if (status === 'forgot') {
        this.currentStatus = 'forgot'
        this.currentTitle = 'Forgot Password'
      }
    }
  },
  watch: {
    isHidden(isHidden) {
      const status = this.status || 'login'

      if (!isHidden) {
        this.toggle.isLoading = false
        this.errorMessage = ''
        this.changeStatus(status)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
.modal-background {
  display: block;
}
.error {
  display: inline-block;
  margin-top: 6px;
  color: @color-red;
  font-weight: 400;
  font-size: 15px;
}
</style>
