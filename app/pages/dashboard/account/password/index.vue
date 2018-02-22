<template>
  <div class="dashboard-page-container">

    <spinkit id="loader"></spinkit>

    <form @submit.prevent="onEditButton">
      <div class="body-container">

        <!-- Required Input Container -->
        <div class="required-container input-container">
          <p class="title">{{ $t('dashboardMyAccount.password.title') }}</p>
          <p class="sub-title">{{ $t('dashboardMyAccount.password.subTitle') }}</p>

          <!-- Current Password Container -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.password.currentPassword') }}</div>
            <div class="right-contents"><input required minlength="8" type="password" placeholder="" v-model="value.currentPassword"></div>
          </div>
          <br>

          <!-- New Password Container -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.password.newPassword') }}</div>
            <div class="right-contents"><input required minlength="8" type="password" placeholder="" v-model="value.newPassword"></div>
          </div>
          <!-- Confirm Password Container -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.password.confirmPassword') }}</div>
            <div class="right-contents"><input required minlength="8" type="password" placeholder="" v-model="value.newPasswordConfirm"></div>
          </div>
        </div>

        <!-- Edit Password Container -->
        <div class="confirm-container input-container">
          <button class="button-orange">{{ $t('dashboardMyAccount.password.change') }}</button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Spinkit from '~/components/Loader'
  import { mapGetters } from 'vuex'
  export default {
    head () {
      return {
        title: 'Change Password'
      }
    },
    components: {
      Spinkit
    },
    props: {
      contact: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          currentPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        }
      }
    },
    methods: {
      onEditButton () {
        this.activateLoader()
        const data = {
          password: this.value.currentPassword,
          new_password: this.value.newPassword,
          new_password_confirm: this.value.newPasswordConfirm
        }
        axios.put(`/api/data/contact/${this.contact.contact_id}/password_change`, {
          contact_data: data
        })
          .then(() => {
            this.changeSucceed()
            this.resetLocalData()
          })
          .catch(err => {
            this.changeFailed(err.response.data.code)
          })
      },
      resetLocalData () {
        this.value.currentPassword = ''
        this.value.newPassword = ''
        this.value.newPasswordConfirm = ''
      },
      activateLoader () {
        $('#loader').removeClass().addClass('spinkit-modal')
      },
      deactivateLoader () {
        $('#loader').removeClass()
      },
      changeSucceed () {
        this.showAlert(true, this.$t('dashboardMyAccount.alert.success'))
      },
      changeFailed (code) {
        switch (code) {
          case '8001':
            this.showAlert(false, this.$t('dashboardMyAccount.alert.8001'))
            break
          case '8002':
            this.showAlert(false, this.$t('dashboardMyAccount.alert.8002'))
            break
          case '8003':
            this.showAlert(false, this.$t('dashboardMyAccount.alert.8003'))
            break
          case '8004':
            this.showAlert(false, this.$t('dashboardMyAccount.alert.8004'))
            break
          default:
            this.showAlert(false, this.$t('dashboardMyAccount.alert.8004'))
            break
        }
      },
      showAlert (alertState, msg) {
        $(document).ready(() => {
          this.deactivateLoader()
          const $alert = $('#alert')
          this.$store.commit('alert/changeState', {
            alertState,
            msg
          })
          setTimeout(() => {
            $('.alert-container').hide()
          }, 6000)
          $alert.show()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  /* Global CSS */
  p {
    margin: 0;
  }

  @height: 50px;
  @mark-right-amount: 12px;
  @small-mark-right-amount: 18px;
  @mark-bottom-amount: 16px;
  @font-size-button: 22px;
  @font-weight-button: 600;

  .dashboard-page-container {
  }

  .input-container {
    margin-bottom: 40px;
  }

  .title {
    font-size: 30px;
    font-weight:600;
    margin-bottom:18px;
  }
  .sub-title {
    font-size: 20px;
    font-weight:300;
    margin-bottom: 4px;
  }
  .third-title {
    font-size: 15px;
    font-weight:600;
    margin-bottom: 4px;
  }
  input {
    width: 100%;
    height: @height;
    font-size: 20px !important;
    font-weight: 400;
    margin-bottom: 5px !important;

    &:focus,
    &:active,
    &:visited {
      -webkit-transition: all 500ms;
      -moz-transition: all 500ms;
      -ms-transition: all 500ms;
      -o-transition: all 500ms;
      transition: all 500ms;
      border: 1px solid @color-orange;
    }
  }
  label {
    .upload-label-basic;
    border: 1px solid @color-font-base;
    margin-top: 10px;
    font-size: @font-size-button;
    font-weight: @font-weight-button;
  }
  textarea {
    font-size: 20px !important;
    font-weight: 400 !important;

    &:focus,
    &:active,
    &:visited {
      -webkit-transition: all 500ms;
      -moz-transition: all 500ms;
      -ms-transition: all 500ms;
      -o-transition: all 500ms;
      transition: all 500ms;
      border: 1px solid @color-orange;
    }
  }
  select {
    font-size: 20px !important;
    font-weight: 400 !important;
    margin-bottom: 5px !important;
    height: @height !important;
  }
  button {
    font-size: @font-size-button;
    font-weight: @font-weight-button;
    border: 1px solid @color-orange;
  }

  .dashboard-page-container {
    position: relative;

    .header-container {
      margin-bottom:30px;

      .title {
        font-size:30px;
        font-weight: 600;
      }
    }

    .body-container {
    }

  }
</style>
