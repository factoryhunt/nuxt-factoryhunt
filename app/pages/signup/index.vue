<template>
  <div class="page-container">
    <div class="form-contents">

      <auth-header></auth-header>

      <form class="form-container" @submit.prevent="onSignUpButton">
        <div class="input-container">
          <input 
            required 
            v-model="value.company" 
            type="text" 
            pattern="[A-Za-z0-9 ().,&]{2,50}"
            :placeholder="$t('forSupplier.header.companyName.placeholder')" 
            :title="$t('forSupplier.header.companyName.inputTitle')">
          <i id="image-company" class="fa fa-building-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input required v-model="value.email" type="email" :placeholder="$t('forSupplier.header.email.title')">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input required minlength="8" v-model="value.password" type="password" :placeholder="$t('forSupplier.header.password.placeholder')" :title="$t('forSupplier.header.password.inputTitle')">
          <i id="image-password" class="fa fa-lock" aria-hidden="true"></i>
        </div>
        <p class="password-caution-text">{{ $t('forSupplier.header.caution') }}</p>

        <div class="sign-up-button-container">
          <loader id="sign-up-loader"></loader>
          <button id="sign-up-button" class="button-orange">{{ $t('forSupplier.header.signUpButton') }}</button>
        </div>
        <p class="terms" v-html="$t('forSupplier.header.agreement')"></p>

        <div class="login-container">
          <div class="login-wrapper">
            <nuxt-link to="/login" class="text-login">{{ $t('signUp.didYouAlreadyHaveAccount') }}</nuxt-link>
            <nuxt-link to="/login" class="button-white">{{ $t('signUp.login') }}</nuxt-link>
          </div>
        </div>
      </form> <!--form-container -->
    </div> <!-- form-contents -->
  </div> <!-- page-container -->
</template>

<script>
import axios from '~/plugins/axios'
import AuthHeader from '~/components/AuthHeader'
import Loader from '~/components/Loader'

export default {
  layout: 'blank',
  // transition: 'fade',
  head() {
    return {
      title: this.$t('signUp.signUp'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Create your Factory Hunt account. Already have an account? Sign in.'
        }
      ],
      link: [{ hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/signup` }]
    }
  },
  components: {
    AuthHeader,
    Loader
  },
  data() {
    return {
      value: {
        lead_id: 0,
        email: '',
        company: '',
        password: ''
      }
    }
  },
  methods: {
    init() {
      this.getToken()
    },
    async getToken() {
      const { token } = this.$route.query
      if (!token) return

      const { data } = await axios.post('/api/jwt/decode', { token })
      this.value.lead_id = data.lead_id
    },
    async onSignUpButton() {
      const $loader = $('#sign-up-loader')
      const $signUpButton = $('#sign-up-button')
      try {
        $loader.removeClass().addClass('spinkit-input')
        $signUpButton.css('display', 'none')
        await this.signUp()
        $loader.removeClass().addClass('invisible')
        $signUpButton.css('display', 'inherit')
        alert(this.$t('signUp.signUpSuccess'))

        location.href = '/signup/step1'
      } catch (err) {
        $loader.removeClass().addClass('invisible')
        $signUpButton.css('display', 'inherit')
        alert(err.data.msg)
      }
    },
    signUp() {
      return new Promise((resolve, reject) => {
        const data = {
          lead_id: this.value.lead_id,
          company: this.value.company,
          email: this.value.email,
          password: this.value.password
        }
        this.$store
          .dispatch('auth/signUp', data)
          .then(() => {
            resolve()
          })
          .catch(err => {
            reject(err.response)
          })
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

.form-contents {
  .contents-size(500px, 60px auto, 0 24px);
}

.form-container {
  border-radius: 4px;
  box-shadow: @box-shadow;
  padding: 30px;

  span {
    font-size: 15px;
  }

  .input-container {
    position: relative;
    border-radius: 4px;
    border: 1px solid @color-light-grey;
    margin: 10px 0;

    input {
      position: relative;
      width: 100%;
      height: 50px;
      padding: 12px 40px 12px 12px;
      font-size: 16px;
      outline: none;
      border: none;
    }
    i {
      position: absolute;
      font-size: 20px;
      top: 16px;
      right: 14px;
    }

    #image-company {
      right: 16px;
    }
    #image-password {
      right: 18px;
    }
  }

  .sign-up-button-container {
    margin-top: 40px;
    .button-orange {
      width: 100%;
      height: 50px;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .password-caution-text {
    margin-top: 5px;
    margin-bottom: 0;
    font-size: 13px;
    color: @color-font-gray;
  }

  .terms {
    text-align: center;
    margin-top: 17px;
    font-size: 12px;
    color: @color-font-gray;
  }

  .login-container {
    border-top: @border-light-grey;
    margin-top: 20px;

    .login-wrapper {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;

      .text-login {
        display: flex;
        align-items: center;
        font-size: 15px;
      }
      .button-white {
        padding: 8px 14px;
        font-size: @font-size-small;
        color: @color-orange;
      }
    }
  }
}
</style>
