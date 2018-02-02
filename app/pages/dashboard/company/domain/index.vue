<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-spinkit"></spinkit>

    <form class="form-container" @submit.prevent="checkDomain">
      <!-- Company Domain -->
      <div class="domain-container input-container">
        <!--<p class="title">Domain Address</p>-->
        <!--<i class="fa fa-circle required-circle" aria-hidden="true"><span> Required field</span></i>-->
        <p class="title">{{ $t('dashboardCompany.domain.title') }}</p>
        <p class="sub-title">www.factoryhunt.com/<span id="domain-text">{{ value.domain }}</span></p>
        <input required pattern="[a-z0-9]{3,50}" :title="$t('dashboardCompany.domain.inputTitle')" id="domain-input" type="text" :placeholder="$t('dashboardCompany.domain.placeholder')" v-model="value.domain" @keyup="domainInputPressed" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
        <!--<i id="domain-mark" class="big-mark" aria-hidden="true"></i>-->
        <p class="hidden-title">{{ $t('dashboardCompany.domain.inputTitle') }}</p>
        <!--<spinkit id="domain-spinkit"></spinkit>-->
      </div>

      <!-- Confirm and Submit -->
      <div class="confirm-container input-container sticky-stopper">
        <!--<p class="title">Confirm and Save</p>-->
        <!--<p class="sub-title">Please confirm all information above before you click edit button</p>-->
        <button class="button-orange">{{ $t('dashboardCompany.domain.button') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  import Spinkit from '~/components/Loader'
  export default {
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {
      Spinkit
    },
    data () {
      return {
        value: {
          domain: ''
        },
        toggle: {
          isDomainAvailable: null
        },
        placeholder: {
          domain: 'Domain Address'
        }
      }
    },
    messages: {
      eng: {
        domain: {
          title: 'Customize your domain.',
          placeholder: 'Domain address',
          caution: 'It must be 3-50 and can only contain letters, and numbers.',
          button: 'Save',
          success: 'Your domain has been updated successfully.',
          fail: 'The domain is taken. Please try another.'
        }
      },
      kor: {
        domain: {
          title: '회사 이름이 포함된 맞춤형 도메인으로 변경하세요.',
          placeholder: '도메인 주소',
          caution: '3~50자의 영어와 숫자만 입력해주세요.',
          button: '저장하기',
          success: '도메인이 성공적으로 업데이트 되었습니다.',
          fail: '입력한 도메인이 이미 사용중입니다. 다른 도메인을 입력해주세요.'
        }
      }
    },
    methods: {
      // not allowed capital letters
      applyAttributes () {
        // when login user is page admin, keep going
        this.applyLocalData(this.account)
      },
      applyLocalData (account) {
        this.value.domain = account.domain
      },
      async checkDomain () {
        $('#modal-spinkit').removeClass().addClass('spinkit-modal')

        try {
          let { data } = await axios.get(`/api/data/account/domain/${this.value.domain}`)
          const { account } = data
          if (account) {
            if (account.account_id === this.account.account_id) {
              this.updateDomain()
            } else {
              this.onEditFail()
            }
          } else {
            this.updateDomain()
          }
        } catch (err) {
          this.onEditFail()
        }
      },
      onEditSuccess () {
        this.showAlert(true, this.$t('dashboardCompany.alert.domain.success'))
        $('#modal-spinkit').removeClass()
      },
      onEditFail () {
        this.showAlert(false, this.$t('dashboardCompany.alert.domain.fail'))
        $('#modal-spinkit').removeClass()
        this.toggle.isDomainAvailable = false
      },
      showAlert (alertState, msg) {
        $(document).ready(() => {
          const $alert = $('#alert')
          this.$store.commit('alert/changeState', {
            msg,
            alertState
          })
          $alert.show()
          setTimeout(() => {
            $('.alert-container').hide()
          }, 6000)
        })
      },
      domainInputPressed () {
        this.value.domain = this.value.domain.toLowerCase()
      },
      applyInputFocusBlurEvent (input, mark) {
        const domainInput = $('#domain-input')
        const accountNameInput = $('#account-name-input')
        const accountNameMark = $('#account-name-mark')
        const hiddenTitle = $('.account-name-container > .hidden-title')

        domainInput.blur(() => {
          this.checkDomain(this.value.domain)
        })

        accountNameInput.blur(() => {
          if (this.value.accountName) {
            this.toggle.isAccountNameAvailable = true
            this.msg.accountName.hiddenTitle = ''
            accountNameMark.removeClass('fa fa-exclamation')
          } else {
            this.toggle.isAccountNameAvailable = false
            this.msg.accountName.hiddenTitle = 'It is a required field.'
            hiddenTitle.css({'color': 'red'})
            accountNameMark.addClass('fa fa-exclamation')
          }
        })
      },
      updateDomain () {
        // props
        const data = {
          domain: this.value.domain
        }
        // request
        axios.put(`/api/data/account/${this.account.account_id}`, {
          account_data: data
        })
          .then(() => {
            this.onEditSuccess()
          })
          .catch(() => {
            $('#modal-spinkit').removeClass()
            alert('Failed. Try again please.')
          })
      }
    },
    mounted () {
      this.applyAttributes()
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  /* Global CSS */

  .title {
    font-size: 32px;
    font-weight:700;
    margin-top: 0;
  }
  .sub-title {
    font-size: 24px;
    font-weight:300;
    margin-bottom:10px;
  }
  /* Global CSS */

  .required-circle {
    vertical-align: top;
    padding-top: 8px;
    display: inline-block;
    color: @color-orange;
    font-size: 0.5px;

    span {
      font-size:12px !important;
      font-weight:500;
    }
  }

  @media ( min-width: 768px ) {

    .header-container .title {
      padding-right: 75px;
    }
    .header-container .logo {
      width: 70px;
      border-radius: 35px;
      border: 1px solid #eeeeee;
    }

    .right-container {
      max-width: 600px;
      margin: 0 auto 30px auto;
    }

    .location-container {  }
    .location-container #map {
      margin: 30px 0;
      width: 100%;
      min-height: 450px;
    }
  }

  @media ( min-width: 1128px ) {

    @height: 50px;
    @mark-right-amount: 12px;
    @small-mark-right-amount: 18px;
    @mark-bottom-amount: 16px;
    @font-size-button: 22px;
    @font-weight-button: 600;

    /* Global CSS */
    .dashboard-page-container {
    }

    .input-container {
      margin-bottom: 40px;
    }
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
        width: 140px;
        border-right: 1px solid @color-light-grey;
      }
      .right-contents {
        padding-left: 140px;

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

    .title {
      font-size: 30px;
      font-weight:600;
      margin-top: 0;
    }
    .sub-title {
      font-size: 30px;
      font-weight:300;
      margin-bottom: 4px;
    }
    .third-title {
      font-size: 15px;
      font-weight:600;
      margin-bottom: 4px;
    }
    .hidden-title {
      margin: 0;
    }
    #domain-text {
      font-weight: 400;
      font-size:28px;
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
        border: 1px solid @color-link;
      }
    }
    button {
      font-size: @font-size-button;
      font-weight: @font-weight-button;
      border: 1px solid @color-orange;
    }

    .big-mark {
      position: absolute;
      font-size: 28px;
      font-weight: 100;
      right: @mark-right-amount;
    }
    .small-mark {
      position: absolute;
      font-size: 22px;
      font-weight: 100;
      width: 30px;
      color: @color-font-base;
      right: @small-mark-right-amount
    }

    .domain-container {
      position: relative;

      .required-circle {
      }

      #domain-mark {
        top: 116px;
      }

      .spinkit-input {
        position: absolute;
        top: 122px;
        right: @mark-right-amount;
      }
    }

    .confirm-container {
      .title {
        margin-bottom: 0 !important;
      }
      .sub-title {
        margin-bottom: 10px;
      }
      button {
        font-size: @font-size-button;
        font-weight: @font-weight-button;
      }
    }
  }
</style>
