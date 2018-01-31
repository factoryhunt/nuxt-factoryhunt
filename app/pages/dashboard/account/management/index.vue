<template>
  <div class="dashboard-page-container">

    <!-- Before Button Press -->
    <div v-if="!toggle.isShowing" class="body-container">
      <!-- Delete Account Button -->
      <button id="first-drop-button" class="button-orange" @click="toggle.isShowing = true" v-lang.deleteAccountButton></button>
    </div>

    <!-- After Button Press -->
    <div v-else class="body-container">
      <form @submit.prevent="dropAccount">

        <!-- Account Drop -->
        <div class="drop-container input-container">
          <p class="title" v-lang.deleteAccountButton></p>

          <div class="description-container input-container">
            <p class="sub-title" v-lang.drop.subTitle></p>
            <textarea rows="10" :placeholder="getDropPlaceholder" v-model="value.description"></textarea>
          </div>
        </div>

        <!-- Cautions -->
        <div class="caution-container input-container">
          <p class="title" v-lang.caution.title></p>
          <ul>
            <li><p class="sub-title" v-lang.caution.first></p></li>
            <li><p class="sub-title" v-lang.caution.second></p></li>
            <li><p class="sub-title" v-lang.caution.third></p></li>
            <li><p class="sub-title" v-lang.caution.forth></p></li>
          </ul>
        </div>

        <!-- Confirm -->
        <div class="confirm-container input-container">
          <p class="sub-title" v-lang.confirm.subTitle></p>
          <button id="drop-button" class="button-orange" v-lang.confirm.delete></button>
          <button id="cancel-button" class="button-white" @click="onCancelButton" v-lang.confirm.cancel></button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import $ from 'jquery'
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
    messages: {
      eng: {
        deleteAccountButton: 'Delete account',
        drop: {
          subTitle: 'Could you tell us why you want to stop using the service?',
          placeholder: 'If you tell us the reason why you want to delete the account, we will do our best to improve the service to make users happy.'
        },
        caution: {
          title: 'What happens when a user delete account.',
          first: 'All information will be deleted.',
          second: 'No more appears in the search result.',
          third: 'Your domain could be taken by someone else.',
          forth: 'There could be some disadvantages when you signup again.'
        },
        confirm: {
          subTitle: 'Are you sure you want to delete your account?',
          delete: 'Delete',
          cancel: 'Cancel'
        }
      },
      kor: {
        deleteAccountButton: '계정 해지하기',
        drop: {
          subTitle: '왜 떠나시나요? 이유를 말씀해주세요.',
          placeholder: '자세히 적어주시면 검토 후 유저분들에게 더 나은 서비스를 제공할 수 있도록 최선을 다하겠습니다. 감사합니다.'
        },
        caution: {
          title: '계정을 해지한다면 생기는 일',
          first: '회원님의 프로필과 회사, 제품 정보가 모두 없어집니다.',
          second: '웹사이트 검색 엔진에 정보가 더 이상 노출되지 않습니다.',
          third: '현재 사용 중인 도메인을 누군가가 사용할 수 있습니다.',
          forth: '재가입시 불이익이 생길 수 있습니다.'
        },
        confirm: {
          subTitle: '그래도 정말 떠나실건가요?..',
          delete: '해지하기',
          cancel: '취소하기'
        }
      }
    },
    methods: {
      onCancelButton () {
        location.replace('/dashboard')
      },
      async dropAccount () {
        try {
          await this.deleteProducts()
          await this.deleteContact()
          await this.deleteAccount()
          this.$store.dispatch('logout')
          alert('Your account has been deleted.')
        } catch (err) {
          alert('Failed. Please try again.')
        }
      },
      deleteProducts () {
        return new Promise((resolve, reject) => {
          this.$http.delete(`/api/data/product/all/${this.getAccountId}`)
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
          this.$http.delete(`/api/data/contact/${this.getContactId}`)
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
          this.$http.delete(`/api/data/account/${this.getAccountId}`)
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
