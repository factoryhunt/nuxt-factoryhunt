<template>
  <div>
    <top-alert-bar/>
    <div id="contents">
      <form @submit.prevent="onResetPasswordButton">
        <h1>{{ $t('verification.resetPassword.title') }}</h1>
        <input 
          v-model="value.password" 
          required 
          :placeholder="$t('verification.resetPassword.password')"
          autocomplete="off" 
          type="password">
        <input 
          v-model="value.confirmPassword" 
          required 
          :placeholder="$t('verification.resetPassword.confirm')"
          autocomplete="off" 
          type="password">
        <p id="tip">{{ $t('forSupplier.header.caution') }}</p>
        <button 
          class="button-orange"
          v-if="!toggle.isLoading">{{ $t('verification.resetPassword.save') }}</button>
        <loader 
          id="loader" 
          class="spinkit-input visible"
          v-if="toggle.isLoading"/>
        <p id="terms" v-html="$t('verification.resetPassword.terms')"></p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import TopAlertBar from '~/components/Alert/TopAlertBar'
import { showTopAlert } from '~/utils/alert'
import Loader from '~/components/Loader'
export default {
  layout: 'minify',
  components: {
    TopAlertBar,
    Loader
  },
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
      },
      toggle: {
        isLoading: false
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
        this.toggle.isLoading = true
        await this.resetPassword(this.getPasswords)
        location.href = '/login'
      } catch (err) {
        this.toggle.isLoading = false
        this.showTopAlert(err.response.data.code)
      }
    },
    showTopAlert(code) {
      switch (code) {
        case '8001':
          showTopAlert(this.$store, false, this.$t('dashboardMyAccount.password.alert.8001'))
          break
        case '8002':
          showTopAlert(this.$store, false, this.$t('dashboardMyAccount.password.alert.8002'))
          break
        case '8003':
          showTopAlert(this.$store, false, this.$t('dashboardMyAccount.password.alert.8003'))
          break
        case '8004':
          showTopAlert(this.$store, false, this.$t('dashboardMyAccount.password.alert.8004'))
          break
        default:
          showTopAlert(this.$store, false, this.$t('dashboardMyAccount.password.alert.8004'))
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

#contents {
  max-width: 468px;
  margin: 0 auto;
}

form {
  margin: 40px 0;
  padding: 20px 30px;
  box-shadow: 0 2px 4px @color-light-gray;
  border-radius: @border-radius;
}

h1 {
  margin-top: 0;
}

input {
  width: 100%;
  font-size: 16px;
  padding-top: 14px;
  padding-bottom: 14px;
  margin: 6px 0;
  outline: 0;
  transition: border linear 0.2s;

  &:focus {
    border-color: @color-link;
  }
}
#tip {
  margin-top: 3px;
  margin-bottom: 0;
  font-size: 13px;
  color: @color-font-gray;
}
#terms {
  font-size: 13px !important;
  color: @color-font-gray;
  text-align: center;
}
button {
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;

  &:hover {
    background-color: @color-dark-orange !important;
  }
}
#loader {
  margin-top: 20px;
}
</style>
