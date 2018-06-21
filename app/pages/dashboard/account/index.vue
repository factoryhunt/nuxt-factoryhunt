<template>
  <div class="dashboard-page-container">

    <div class="modal-background visible" v-if="toggle.isSaving">
      <div class="modal-content">
        <loader class="spinkit-default"/>
      </div>
    </div>

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

          <!-- Salutation -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.salutation.title') }}</div>
            <div class="right-contents">
              <select v-model="value.salutation">
                <option value="" disabled>Select</option>
                <option v-for="(salutation, index) in salutations" :key="index" :value="salutation">{{salutation}}</option>
              </select>
            </div>
          </div>

          <!-- First name -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.firstName.title') }}</div>
            <div class="right-contents">
              <input 
                type="text" 
                pattern="[A-Za-z .-]{1,20}" 
                :placeholder="$t('dashboardMyAccount.body.firstName.placeholder')" 
                :title="$t('dashboardMyAccount.body.firstName.inputTitle')" v-model="value.firstName"></div>
          </div>
          <!-- Last name -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.lastName.title') }}</div>
            <div class="right-contents">
              <input 
                type="text" 
                pattern="[A-Za-z]{1,20}" 
                :placeholder="$t('dashboardMyAccount.body.lastName.placeholder')" 
                :title="$t('dashboardMyAccount.body.lastName.inputTitle')" v-model="value.lastName"></div>
          </div>

          <!-- Title -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.titles.title') }}</div>
            <div class="right-contents">
              <input 
                type="text" 
                pattern="[A-Za-z ,]{1,60}" 
                :placeholder="$t('dashboardMyAccount.body.titles.placeholder')" 
                :title="$t('dashboardMyAccount.body.titles.inputTitle')" 
                v-model="value.title"></div>
          </div>

          <!-- Phone -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.phone.title') }}</div>
            <div class="right-contents">
              <input 
                type="text" 
                pattern="[0-9+-]{1,21}" 
                :placeholder="$t('dashboardMyAccount.body.phone.placeholder')" :title="$t('dashboardMyAccount.body.phone.inputTitle')" v-model="value.phone"></div>
          </div>

          <!-- Ext -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.ext.title') }}</div>
            <div class="right-contents">
              <input 
                type="text" 
                pattern="[0-9+-]{1,21}" 
                :placeholder="$t('dashboardMyAccount.body.ext.placeholder')" 
                :title="$t('dashboardMyAccount.body.ext.inputTitle')" v-model="value.ext"></div>
          </div>

          <!-- Mobile -->
          <div class="box-container">
            <div class="left-contents">{{ $t('dashboardMyAccount.body.mobile.title') }}</div>
            <div class="right-contents">
              <input 
                type="text" 
                pattern="[0-9+-]{1,21}" 
                :placeholder="$t('dashboardMyAccount.body.mobile.placeholder')" 
                :title="$t('dashboardMyAccount.body.mobile.inputTitle')" 
                v-model="value.mobile"></div>
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
import Loader from '~/components/Loader'
import salutation from '~/assets/models/salutation.json'
import { showTopAlert } from '~/utils/alert'
import { updateUserDataToVuex } from '~/utils/auth'
export default {
  head() {
    return {
      title: 'Edit Account'
    }
  },
  components: {
    Loader
  },
  props: {
    contact: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      salutations: salutation,
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
        ext: '',
        mobile: '',
        type: ''
      },
      toggle: {
        isSaving: false
      }
    }
  },
  methods: {
    onEditButton() {
      this.activateLoader()

      const data = {
        contact_email: this.value.email,
        salutation: this.value.salutation,
        first_name: this.value.firstName,
        last_name: this.value.lastName,
        contact_title: this.value.title,
        contact_phone: this.value.phone,
        contact_phone_ext: this.value.ext,
        contact_mobile: this.value.mobile
      }
      axios
        .put(`/api/data/contact/${this.contact.contact_id}`, {
          contact_data: data
        })
        .then(() => {
          this.onEditSuccess()
        })
        .catch(() => {
          this.onEditFail()
        })
    },
    mappingData() {
      this.value.email = this.contact.contact_email
      this.value.salutation = this.contact.salutation
      this.value.firstName = this.contact.first_name
      this.value.lastName = this.contact.last_name
      this.value.title = this.contact.contact_title
      this.value.phone = this.contact.contact_phone
      this.value.ext = this.contact.contact_phone_ext
      this.value.mobile = this.contact.contact_mobile
    },
    activateLoader() {
      this.toggle.isSaving = true
      $('.alert-container').hide()
    },
    deactivateLoader() {
      this.toggle.isSaving = false
    },
    onEditSuccess() {
      $(document).ready(() => {
        this.deactivateLoader()
        updateUserDataToVuex(this.$store)
        showTopAlert(this.$store, true, this.$t('alert.success'))
      })
    },
    onEditFail() {
      $(document).ready(() => {
        this.deactivateLoader()
        showTopAlert(this.$store, false, this.$t('alert.fail'))
      })
    },
    activateJquery() {
      $(document).ready(() => {})
    }
  },
  mounted() {
    this.mappingData()
    this.activateJquery()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

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
  font-weight: 600;
  margin-bottom: 18px;
}
.sub-title {
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 4px;
}
.third-title {
  font-size: 15px;
  font-weight: 600;
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
  border: 0 !important;
}
button {
  font-size: @font-size-button;
  font-weight: @font-weight-button;
  border: 1px solid @color-orange;
}

.dashboard-page-container {
  position: relative;

  .header-container {
    margin-bottom: 30px;

    .title {
      font-size: 30px;
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
