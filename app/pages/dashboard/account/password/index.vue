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
  import $ from 'jquery'
  import Spinkit from '~/components/Loader'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Spinkit
    },
    metaInfo: {
      title: 'Change Password | Factory Hunt'
    },
    props: {
      contact: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    messages: {
      eng: {
        editFail: 'Change failed. Please try again.',
        title: 'New password',
        subTitle: 'Use at least one letter, one numeral, and eight characters.',
        currentPassword: 'Old Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
        change: 'Change',
        alert: {
          success: 'Your password has been changed.',
          8001: 'Your new passwords did not match. Please try again.',
          8002: 'Your password must at least 8 characters. Please try again.',
          8003: 'Your old password was incorrect. Please try again.',
          8004: 'Password update failed: Internal server error. Please try again.'
        }
      },
      kor: {
        editSuccess: '비밀번호가 변경 되었습니다.',
        editFail: '변경 실패. 다시 시도해주세요.',
        title: '이전 비밀번호',
        subTitle: '비밀번호는 문자와 숫자의 조합으로 최소 8문자를 포함해야 합니다.',
        currentPassword: '현재 비밀번호',
        newPassword: '새 비밀번호',
        confirmPassword: '비밀번호 확인',
        change: '변경하기',
        alert: {
          success: '비밀번호가 성공적으로 변경되었습니다.',
          8001: '새로운 비밀번호가 일치하지 않습니다. 다시 시도해 주세요.',
          8002: '비밀번호는 8자 이상이어야 합니다. 다시 시도해 주세요.',
          8003: '이전 비밀번호가 정확하지 않습니다. 다시 입력해 주세요.',
          8004: '비밀번호 변경 실패: 서버 내부 오류가 발생했습니다. 다시 시도해 주세요.'
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
    computed: {
      ...mapGetters([
        'getContactId'
      ]),
      getSuccessAlert () {
        return this.translate('alert.success')
      },
      get8001Alert () {
        return this.translate('alert.8001')
      },
      get8002Alert () {
        return this.translate('alert.8002')
      },
      get8003Alert () {
        return this.translate('alert.8003')
      },
      get8004Alert () {
        return this.translate('alert.8004')
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
        this.$http.put(`/api/data/contact/password_change/${this.getContactId}`, data)
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
        this.showAlert(true, this.getSuccessAlert)
      },
      changeFailed (code) {
        switch (code) {
          case '8001':
            this.showAlert(false, this.get8001Alert)
            break
          case '8002':
            this.showAlert(false, this.get8002Alert)
            break
          case '8003':
            this.showAlert(false, this.get8003Alert)
            break
          case '8004':
            this.showAlert(false, this.get8004Alert)
            break
          default:
            this.showAlert(false, this.get8004Alert)
            break
        }
      },
      showAlert (alertState, msg) {
        $(document).ready(() => {
          this.deactivateLoader()
          window.scrollTo(0, 0)
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

      .box-container {
        position: relative;
        width: 100%;
        border: 1px solid @color-light-grey;
        border-radius: @border-radius;
        margin-bottom: 4px;

        .left-contents {
          float: left;
          font-size: 16px;
          font-weight: 600;
          padding-left: 18px;
          height: @height;
          line-height: @height;
          width: 180px;
          border-right: 1px solid @color-light-grey;
        }
        .right-contents {
          padding-left: 190px;

          input {
            border: none;
            margin-bottom: 0 !important;
          }
          select {
            position: relative;
            border: none;
            margin-bottom: 0 !important;
          }
          #disabled-option {
            color: @color-input-placeholder;
          }
        }
      }
    }

  }
</style>
