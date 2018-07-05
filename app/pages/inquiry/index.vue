<template>
  <form @submit.prevent="sendInquiry" id="form-container">
    <div class="narrow-contents">
      <h2>Send Inquiry</h2>
      <div class="divider"></div>

      <div class="input-container">
        <input class="input-disable" type="text" placeholder="Company" :value="vendor.account_name" readonly>
        <i class="fa fa-building-o" aria-hidden="true"></i>
      </div>

      <div class="input-container">
        <input class="input-disable" type="text" placeholder="Products" :value="product.product_name" readonly>
        <i class="fa fa-cube" aria-hidden="true"></i>
      </div>

      <div class="input-container">
        <input required type="email" v-model="email" :placeholder="$t('inquiry.email')">
        <i class="fa fa-envelope-o" aria-hidden="true"></i>
      </div>

      <textarea required rows="7" v-model="inquiry" :placeholder="$t('inquiry.message') "></textarea>

      <div class="button-container">
        <div class="help-container">
          <a href="/contact" target="_blank"><i class="fa fa-info-circle"></i> {{ $t('inquiry.needOurHelp') }}</a>
        </div>
        <loader v-show="toggle.isEmailSending" class="spinkit-input"/>
        <button v-show="!toggle.isEmailSending" type="submit" class="button-orange">{{ $t('inquiry.sendInquiry') }}</button>
      </div>

    </div>

  </form>
</template>

<script>
import Loader from '~/components/Loader'
import { sendEmail } from '~/utils/email'
import { getAccountByAccountId, getProductByProductId } from '~/utils/api'
import { mapGetters } from 'vuex'
export default {
  scrollToTop: true,
  components: {
    Loader
  },
  head() {
    return {
      title: `Inquiry for ${this.vendor.account_name}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.factoryhunt.com/inquiry?pid=${this.product.product_id}&aid=${
            this.vendor.account_id
          }`
        }
      ]
    }
  },
  async asyncData({ query, error }) {
    try {
      const promise = await Promise.all([
        getAccountByAccountId(query.aid),
        getProductByProductId(query.pid)
      ])
      return {
        vendor: promise[0].data,
        product: promise[1].data
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Sorry, page not existed.' })
    }
  },
  data() {
    return {
      vendor: {},
      product: {},
      email: '',
      inquiry: '',
      toggle: {
        isEmailSending: false
      }
    }
  },
  computed: mapGetters({
    contact: 'auth/GET_CONTACT'
  }),
  methods: {
    async sendInquiry() {
      this.toggle.isEmailSending = true

      const data = {
        company: this.vendor.account_name,
        products: this.vendor.products,
        domain: `${this.vendor.domain}/${this.product.product_domain}`,
        inquiry: this.inquiry,
        products: this.product.product_name,
        contact_email: this.vendor.contact_email,
        sender_id: this.contact.contact_id,
        subject: 'You have got a new inquiry from a buyer.'
      }

      try {
        await sendEmail(data)
        this.toggle.isEmailSending = false
        alert(this.$t('alert.email.success'))
        this.$router.push(`/${this.vendor.domain}`)
      } catch (err) {
        this.toggle.isEmailSending = false
        alert(this.$t('alert.email.fail'))
      }
    }
  },
  mounted() {
    this.email = this.contact.contact_email || ''
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

.narrow-contents {
  padding-bottom: 30px;
}
.input-container {
  position: relative;
  border: 1px solid lightgrey;
  border-radius: 3px;
  margin-bottom: 25px;
}
.input-container input {
  width: 100%;
  border-radius: 4px;
  font-size: @font-size-large;
  padding: 12px 12px 12px 55px;
  border: none;
  box-shadow: none;
  outline: none;
}
.input-container i {
  position: absolute;
  left: 20px;
  top: 28%;
  font-size: 20px;
  width: 55px;
}
.input-disable {
  background-color: #eeeeee;
}

textarea {
  font-size: @font-size-large;
}
.button-container .help-container {
  text-align: right;
  margin-top: 30px;
  margin-bottom: 8px;
  font-size: 17px;
}
.button-container button {
  display: block;
  width: 100%;
  height: 55px;
  font-weight: 600;
  font-size: 18px;
}
</style>
