<template>
  <div class="modal-background">
    <div class="table-container">
      <div class="cell-container">

        <div class="contents" role="dialog">

          <!-- cancel button -->
          <img 
            id="cancel-icon" 
            src="~assets/icons/cancel.svg" 
            alt="cancle"
            @click="hideForgotPassword">

          <div class="contents-body">

            <form 
              v-show="!toggle.isSent"
              @submit.prevent="onSendResetButton">
              <h1>Forgot Password</h1>
              <p class="desc">Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>

              <input 
                required
                type="email"
                v-model="value.email">
              <p id="alert-text">{{value.alert}}</p>

              <div class="bottom-container">
                <a 
                  id="back-to-login" 
                  href="/login">
                  <i class="fa fa-angle-left" aria-hidden="true"></i> Back to Login
                </a>
                <button 
                  id="send-reset-button"
                  class="button-orange"
                  v-if="!toggle.isSending">
                  Send Reset Email
                </button>
                <loader 
                  id="loader" 
                  class="spinkit-input visible"
                  v-if="toggle.isSending"/>
              </div>
            </form>

            <div v-show="toggle.isSent">
              <h1>Check out your email</h1>
              <p class="desc">Your reset password email has been sent successfully.</p>
            </div>
            
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Loader from '~/components/Loader'
export default {
  components: {
    Loader
  },
  props: ['hideForgotPassword'],
  data () {
    return {
      value: {
        email: '',
        alert: ''
      },
      toggle: {
        isSending: false,
        isSent: false
      }
    }
  },
  methods: {
    async onSendResetButton () {
      if (this.toggle.isSending) return

      try {
        this.toggle.isSending = true
        await this.sendResetEmail()

        this.toggle.isSending = false
        this.toggle.isSent = true
      } catch (err) {
        console.log('err')
        this.toggle.isSending = false
      }
    },
    sendResetEmail () {
      const body = {
        email: this.value.email
      }
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/forgot_password', body)
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/css/index";
.modal-background {
  display: block;
}
.table-container {
  display: table;
  width: 100%;
  height: 100%;
}
.cell-container {
  display: table-cell;
  vertical-align: middle;
  padding: 64px;
}
.contents {
  margin: 0 auto;
  max-width: 568px;
  padding: 38px;
  background: @color-white;
  border-radius: @border-radius;
}
#cancel-icon {
  width: 22px;
  height: 22px;
  cursor: pointer;
}
.contents-body {
  h1 {
    font-size: 32px;
  }
  .desc {
    margin: 0;
    font-weight: 300;
  }
  #alert-text {
    margin: 0;
    margin-top: 4px;
    font-size: 15px;
    color: @color-pink;
  }
  input {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 50px;
    margin-top: 20px;
    width: 100%;
    font-size: 19px;
    font-weight: 300;
    background: url(~assets/icons/mail.svg);
    background-size: 21px;
    background-repeat: no-repeat;
    background-position: 96% 50%;
    transition: border linear .2s;

    &:hover,
    &:active,
    &:focus {
      border-color: @color-link;
    }
  }
  .bottom-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  #back-to-login {
    font-size: 20px;

    i {
      margin-right: 3px;
    }
  }
  #send-reset-button {
    font-weight: 600;
    font-size: 18px;

    &:hover {
      background-color: @color-dark-orange;
    }
  }
  #loader {
    width: 170px;
    text-align: center;
  }
}

</style>
