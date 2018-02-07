<template>
  <div class="dashboard-page-container">

    <!-- Before Button Press -->
    <div v-if="!toggle.isShowing" class="body-container">
      <!-- Delete Account Button -->
      <button id="first-drop-button" class="button-orange" @click="toggle.isShowing = true">{{ $t('dashboardMyAccount.deleteAccountButton') }}</button>
    </div>

    <!-- After Button Press -->
    <div v-else class="body-container">
      <form @submit.prevent="dropAccount">

        <!-- Account Drop -->
        <div class="drop-container input-container">
          <p class="title">{{ $t('dashboardMyAccount.deleteAccountButton') }}</p>

          <div class="description-container input-container">
            <p class="sub-title">{{ $t('dashboardMyAccount.drop.subTitle') }}</p>
            <textarea rows="10" :placeholder="$t('dashboardMyAccount.drop.placeholder')" v-model="value.description"></textarea>
          </div>
        </div>

        <!-- Cautions -->
        <div class="caution-container input-container">
          <p class="title">{{ $t('dashboardMyAccount.caution.title') }}</p>
          <ul>
            <li><p class="sub-title">{{ $t('dashboardMyAccount.caution.first') }}</p></li>
            <li><p class="sub-title">{{ $t('dashboardMyAccount.caution.second') }}</p></li>
            <li><p class="sub-title">{{ $t('dashboardMyAccount.caution.third') }}</p></li>
            <li><p class="sub-title">{{ $t('dashboardMyAccount.caution.forth') }}</p></li>
          </ul>
        </div>

        <!-- Confirm -->
        <div class="confirm-container input-container">
          <p class="sub-title">{{ $t('dashboardMyAccount.deleteConfirm.subTitle') }}</p>
          <button id="drop-button" class="button-orange">{{ $t('dashboardMyAccount.deleteConfirm.delete') }}</button>
          <button id="cancel-button" class="button-white" @click="onCancelButton">{{ $t('dashboardMyAccount.deleteConfirm.cancel') }}</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import { mapGetters } from 'vuex'
  export default {
    metaInfo: {
      title: 'Manage Account | Factory Hunt'
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      },
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
          description: ''
        },
        toggle: {
          isShowing: false
        }
      }
    },
    methods: {
      onCancelButton () {
        event.preventDefault()
        this.$router.replace('/dashboard')
      },
      async dropAccount () {
        try {
          await this.deleteProducts()
          await this.deleteContact()
          await this.deleteAccount()
          this.$store.dispatch('auth/logout')
          alert('Your account has been deleted.')
        } catch (err) {
          alert('Failed. Please try again.')
        }
      },
      deleteProducts () {
        return new Promise((resolve, reject) => {
          axios.delete(`/api/data/product/all/${this.account.account_id}`)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              reject(err.response)
            })
        })
      },
      deleteContact () {
        return new Promise((resolve, reject) => {
          axios.delete(`/api/data/contact/${this.contact.contact_id}`)
            .then(() => {
              resolve()
            })
            .catch(() => {
              reject()
            })
        })
      },
      deleteAccount () {
        return new Promise((resolve, reject) => {
          axios.delete(`/api/data/account/${this.account.account_id}`)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              reject(err.response)
            })
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

      #first-drop-button {
        font-size: 15px;
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
          width: 170px;
          border-right: 1px solid @color-light-grey;
        }
        .right-contents {
          padding-left: 180px;

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

      .confirm-container {

        #cancel-button {
          margin-left: 8px;
          border: 1px solid @color-input-placeholder;
          color: @color-font-base;
        }
      }
    }

  }
</style>
