<template>
  <div class="dashboard-page-container">

    <div class="modal-background visible" v-if="toggle.isSaving">
      <div class="modal-content">
        <loader id="loader" class="spinkit-default"/>
      </div>
    </div>

    <form class="form-container" @submit.prevent="checkDomain">
      <!-- Company Domain -->
      <div class="domain-container input-container">
        <!--<p class="title">Domain Address</p>-->
        <!--<i class="fa fa-circle required-circle" aria-hidden="true"><span> Required field</span></i>-->
        <p class="title">{{ $t('dashboardCompany.domain.title') }}</p>
        <p class="sub-title">www.factoryhunt.com/<span id="domain-text">{{ value.domain }}</span></p>
        <input 
          required 
          pattern="[a-z0-9.]{3,50}" 
          :title="$t('dashboardCompany.domain.inputTitle')" 
          id="domain-input" 
          type="text" 
          :placeholder="$t('dashboardCompany.domain.placeholder')" 
          v-model="value.domain" 
          @keyup="domainInputPressed" 
          spellcheck="false" 
          autocomplete="off" 
          autocorrect="off" 
          autocapitalize="off">
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
  import { updateUserDataToVuex } from '~/utils/auth'
  import { showTopAlert } from '~/utils/alert'
  import loader from '~/components/Loader'
  export default {
    head () {
      return {
        title: 'Edit Domain',
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/dashboard/company/domain` }
        ]
      }
    },
    components: {
      loader
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          domain: ''
        },
        toggle: {
          isSaving: false,
          isDomainAvailable: null
        },
        placeholder: {
          domain: 'Domain Address'
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
        this.toggle.isSaving = true
        $('.alert-container').hide()

        try {
          this.denyStaticDomain()

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
      denyStaticDomain () {
        const domain = this.value.domain

        if 
        (domain === 'about' ||
        domain === 'contact' ||
        domain === 'for-supplier' ||
        domain === 'dashboard' ||
        domain === 'term' ||
        domain === 'terms' ||
        domain === 'privacy' ||
        domain === 'policy' ||
        domain === 'pricing' ||
        domain === 'inquiry' ||
        domain === 'error' ||
        domain === '404' ||
        domain === '403' ||
        domain === '500' ||
        domain === 'search' ||
        domain === 'supplier' ||
        domain === 'verify' ||
        domain === 'verification' ||
        domain === 'factoryhunt' ||
        domain === 'feeds') throw 'This is static domain.'
      },
      async onEditSuccess () {
        try {
          await updateUserDataToVuex(this.$store)
          showTopAlert(this.$store, true, this.$t('dashboardCompany.alert.domain.success'))
          this.toggle.isSaving = false
        } catch (err) {
          showTopAlert(this.$store, true, this.$t('dashboardCompany.alert.domain.success'))
          this.toggle.isSaving = false
        }
      },
      onEditFail () {
        showTopAlert(this.$store, false, this.$t('dashboardCompany.alert.domain.fail'))
        this.toggle.isSaving = false
        this.toggle.isDomainAvailable = false
      },
      domainInputPressed () {
        this.value.domain = this.value.domain.toLowerCase()
      },
      // Deprecated
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
