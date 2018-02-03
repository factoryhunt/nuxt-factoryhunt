<template>
  <div class="dashboard-page-container">

    <spinkit id="loader"></spinkit>

    <form @submit.prevent="onEditButton">
      <div class="body-container">

        <!-- Title -->
        <p class="title">{{ $t('dashboardMyAccount.header.title') }}</p>
        <p class="sub-title">{{ $t('dashboardMyAccount.header.subTitle') }}</p>

        <div class="input-container">
          <!-- Email -->
          <div class="box-container" style="background-color: #eeeeee">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.email.title') }}</div>
            <div class="right-contents"><input disabled type="email" v-model="value.email"></div>
          </div>

          <!-- First name -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.firstName.title') }}</div>
            <div class="right-contents"><input type="text" pattern="[A-Za-z -.]{1,20}" :placeholder="$t('dashboardMyAccount.body.firstName.placeholder')" :title="$t('dashboardMyAccount.body.firstName.inputTitle')" v-model="value.firstName"></div>
          </div>
          <!-- Last name -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.lastName.title') }}</div>
            <div class="right-contents"><input type="text" pattern="[A-Za-z]{1,20}" :placeholder="$t('dashboardMyAccount.body.lastName.placeholder')" :title="$t('dashboardMyAccount.body.lastName.inputTitle')" v-model="value.lastName"></div>
          </div>

          <!-- Title -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.titles.title') }}</div>
            <div class="right-contents"><input type="text" pattern="[A-Za-z ,]{1,30}" :placeholder="$t('dashboardMyAccount.body.titles.placeholder')" :title="$t('dashboardMyAccount.body.titles.inputTitle')" v-model="value.title"></div>
          </div>

          <!-- Mobile -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.mobile.title') }}</div>
            <div class="right-contents"><input type="text" pattern="[0-9+-]{1,21}" :placeholder="$t('dashboardMyAccount.body.mobile.placeholder')" :title="$t('dashboardMyAccount.body.mobile.inputTitle')" v-model="value.mobile"></div>
          </div>

          <!-- Phone -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.officeNumber.title') }}</div>
            <div class="right-contents"><input type="text" pattern="[0-9+-]{1,21}" :placeholder="$t('dashboardMyAccount.body.officeNumber.placeholder')" :title="$t('dashboardMyAccount.body.officeNumber.inputTitle')" v-model="value.phone"></div>
          </div>
        </div>

        <!-- Confirm -->
        <div class="confirm-container input-container">
          <p class="title">{{ $t('dashboardMyAccount.confirm.title') }}</p>
          <p class="sub-title">{{ $t('dashboardMyAccount.confirm.subTitle') }}</p>
          <button class="button-orange">{{ $t('dashboardMyAccount.confirm.button') }}</button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import $ from 'jquery'
  import Spinkit from '~/components/Loader'
  export default {
    metaInfo: {
      title: 'Edit Information | Factory Hunt'
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
          email: '',
          firstName: '',
          firstNameEnglish: '',
          lastName: '',
          lastNameEnglish: '',
          salutation: '',
          title: '',
          languages: '',
          phone: '',
          mobile: '',
          type: ''
        }
      }
    },
    methods: {
      onEditButton () {
        $('#loader').removeClass().addClass('spinkit-modal')
        const data = {
          contact_email: this.value.email,
          first_name_english: this.value.firstName,
          last_name_english: this.value.lastName,
          contact_title: this.value.title,
          contact_phone: this.value.phone,
          contact_mobile: this.value.mobile
//          first_name_english: this.value.firstNameEnglish,
//          last_name_english: this.value.lastNameEnglish
//          languages: this.value.languages,
//          salutation: this.value.salutation
        }
        axios.put(`/api/data/contact/${this.contact.contact_id}`, {
          contact_data: data
        })
          .then(() => {
            this.onEditSuccess()
          })
          .catch(() => {
            this.onEditFail()
          })
      },
      showAlert (alertState, msg) {
        $(document).ready(() => {
          const $alert = $('#alert')
          this.$store.commit('alert/changeState', {
            alertState,
            msg
          })
          $alert.show()
          setTimeout(() => {
            $('.alert-container').hide()
          }, 6000)
        })
      },
      mappingData () {
        this.value.email = this.contact.contact_email
        this.value.firstName = this.contact.first_name_english
        this.value.lastName = this.contact.last_name_english
        this.value.title = this.contact.contact_title
        this.value.phone = this.contact.contact_phone
        this.value.mobile = this.contact.contact_mobile
      },
      preventEnterKeySubmit () {
        $('input').keydown(() => {
          if (event.keyCode === 13) {
            event.preventDefault()
          }
        })
      },
      activateJquery () {
        $(document).ready(() => {
          this.preventEnterKeySubmit()
        })
      },
      onEditSuccess () {
        $(document).ready(() => {
          window.scrollTo(0, 0)
          $('#loader').removeClass()
          this.showAlert(true, this.$t('alert.success'))
        })
      },
      onEditFail () {
        $(document).ready(() => {
          window.scrollTo(0, 0)
          $('#loader').removeClass()
          this.showAlert(false, this.$t('alert.fail'))
        })
      }
    },
    mounted () {
      this.mappingData()
      this.activateJquery()
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

      .confirm-container {
        .sub-title {
          margin-bottom: 20px;
        }
      }
    }

  }
</style>
