<template>
  <div class="page-container">
    <div class="form-contents">
      <!-- Header -->
      <auth-header/>

      <!-- Form -->
      <form class="form-container" @submit.prevent="onLoginButton">
        <!-- Email -->
        <div class="input-container">
          <input required v-model="value.email" type="email" :placeholder="$t('login.email')">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
        </div>

        <!-- Password -->
        <div class="input-container">
          <input required minlength="8" v-model="value.password" type="password" :placeholder="$t('login.password')">
          <i id="image-password" class="fa fa-lock" aria-hidden="true"></i>
        </div>

        <!-- Login Button -->
        <div class="login-button-container">
          <loader id="login-loader"></loader>
          <button id="login-button" class="button-orange">{{ $t('login.login') }}</button>
        </div>

        <!-- Bottom -->
        <div class="sign-up-container">
          <div class="sign-up-wrapper">
            <a class="text-login" @click="onForgotPassword">{{ $t('login.forgot') }}</a>
            <nuxt-link to="/signup" class="button-white" id="sign-up-button">{{ $t('login.signUp') }}</nuxt-link>
          </div>
        </div>

      </form> <!--form-container -->
    </div> <!-- form-contents -->
  </div> <!-- page-container -->
</template>

<script>
  import AuthHeader from '~/components/AuthHeader'
  import Loader from '~/components/Loader'
  import { mapGetters } from 'vuex'
  import { showTopAlert } from '~/utils/alert'

  export default {
    layout: 'blank',
    head () {
      return {
        title: this.$t('login.login'),
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/login` }
        ]
      }
    },
    components: {
      AuthHeader,
      Loader
    },
    asyncData ({store, redirect}) {
      if (store.getters['auth/isLoggedIn']) {
        redirect('/dashboard')
      }
    },
    data () {
      return {
        value: {
          email: '',
          password: ''
        }
      }
    },
    messages: {
      eng: {
        email: 'Email',
        password: 'Password',
        login: 'Login',
        signUp: 'Sign Up',
        forgotPassword: 'Forgot your password?',
        comingSoon: 'Sorry, Coming soon.'
      },
      kor: {
        email: '이메일',
        password: '비밀번호',
        login: '로그인',
        signUp: '회원가입',
        forgotPassword: '비밀번호가 기억나지 않으세요?',
        comingSoon: '준비중입니다.'
      }
    },
    methods: {
      async onLoginButton () {
        const data = {
          email: this.value.email,
          password: this.value.password
        }
        const $loader = $('#login-loader')
        const $loginButton = $('#login-button')
        $loader.removeClass().addClass('spinkit-input')
        $loginButton.css('display', 'none')
        this.$store.dispatch('auth/login', data)
          .then(() => {
            this.$router.push('/dashboard')
          })
          .catch((err) => {
            $loader.removeClass().addClass('invisible')
            $loginButton.css('display', 'inherit')
            this.showAlert(err.data.code)
          })
      },
      showAlert (errCode) {
        switch (errCode) {
          case 8001:
            showTopAlert(this.$store, false, this.$t('login.8001'))
            break
          case 8002:
            showTopAlert(this.$store, false, this.$t('login.8002'))
            break
          default:
            showTopAlert(this.$store, false, this.$t('alert.serverError'))
            break
        }
      },
      onForgotPassword () {
        alert('Coming soon.')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  .form-contents {
    .contents-size(500px, 60px auto, 0 24px);
  }

  .form-container {
    border-radius: 4px;
    box-shadow: @box-shadow;
    /*border: 1px solid #484848;*/
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

      #image-password {
        right: 18px;
      }
    }

    .login-button-container {
      margin-top: 40px;
      .button-orange {
        width: 100%;
        height: 50px;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .sign-up-container {
      border-top: @border-light-grey;
      margin-top: 20px;

      .sign-up-wrapper {
        padding-top: 10px;
        display: flex;
        justify-content: space-between;

        .text-login {
          display: flex;
          align-items: center;
          font-size:15px;
        }
        #sign-up-button {
          padding: 8px 14px;
          font-size: @font-size-small;
          color: @color-orange;
        }
      }
    }
  }
</style>
