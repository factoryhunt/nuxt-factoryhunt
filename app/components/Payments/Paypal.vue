<template>
  <div>
    <modal-auth
      :isHidden="isModalAuthHidden"
      @close="isModalAuthHidden = true"/>
    <div id="paypal-button"></div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'
import ModalAuth from '~/components/Modal/Auth'
export default {
  head: {
    script: [{ src: 'https://www.paypalobjects.com/api/checkout.js' }]
  },
  components: {
    ModalAuth
  },
  data: _ => ({
    isModalAuthHidden: true,
    isLoading: false
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      account: 'auth/GET_ACCOUNT',
      isMembershipUser: 'auth/IS_MEMBERSHIP_USER',
      isProduction: 'env/GET_NODE_ENV'
    }),
    getButtonText() {
      return this.isLoading ? 'Loading...' : 'Get Started'
    },
    getAccountId() {
      return this.account.account_id
    }
  },
  methods: {
    init() {
      this.renderPayPal()
    },
    async activateMembership() {
      const api = `/api/data/account/${this.getAccountId}/membership`
      const body = {
        membership_type: 'Standard',
        duration: '365'
      }
      axios
        .put(api, body)
        .then(_ => (location.href = '/verification/pricing'))
        .catch(err => (location.href = '/verification/pricing'))
    },
    renderPayPal() {
      const nuxt = this
      const PAYPAL_CREATE_PAYMENT_URL = '/api/payment/paypal/create_payment'
      const PAYPAL_EXECUTE_PAYMENT_URL = '/api/payment/paypal/execute_payment'
      const getPaypalEnv = this.isProduction ? 'production' : 'sandbox'

      paypal.Button.render(
        {
          env: getPaypalEnv,
          locale: 'en_US',
          style: {
            label: 'checkout',
            size: 'responsive', // small | medium | large | responsive
            shape: 'rect', // pill | rect
            color: 'gold', // gold | blue | silver | black
            tagline: false
          },
          client: {
            sandbox:
              'AdGD-i0u1GhlvK2wtk33UMHjE6gxE9fLUi7gOJjO-LNmsfkD4CP9mGda00nfJvEe-F4U5PGqT3XlJiWR',
            production:
              'AQLW9aeKK8uD0SqlNTwAYm0BeWaeCezkimQzigjGfBQSgaLOnaz5hpJBBwW-knS46YPbOsPF_mNqjNus'
          },
          payment: (data, actions) => {
            if (!this.isLoggedIn) return (this.isModalAuthHidden = false)

            if (this.isMembershipUser) return alert('Your membership is already validated.')

            return actions.request.post(PAYPAL_CREATE_PAYMENT_URL).then(res => res.id)
          },
          onAuthorize: (data, actions) => {
            const body = {
              paymentID: data.paymentID,
              payerID: data.payerID
            }
            return actions.request.post(PAYPAL_EXECUTE_PAYMENT_URL, body).then(res => {
              this.activateMembership()
            })
          },
          onCancel: (data, actions) => {
            alert('Sorry, failed to pay for membership. Please try it later again.')
          }
        },
        '#paypal-button'
      )
    },
    checkValidation() {}
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

* {
  margin: 0;
  padding: 0;
}

// #paypal-button {
//   height: 100%;
// }

// #paypal-button {
//   width: 100%;
//   font-size: 18px;
//   display: block;
//   padding: 11px 20px;
//   text-decoration: none !important;
//   text-align: center;
//   font-weight: 500;
//   background-color: @color-orange;
//   border: 1px solid @color-orange;
//   border-radius: @border-radius;
//   color: @color-white;

//   &[disabled] {
//     opacity: 0.4;
//   }

//   &:hover {
//     cursor: pointer;
//   }
// }
</style>
