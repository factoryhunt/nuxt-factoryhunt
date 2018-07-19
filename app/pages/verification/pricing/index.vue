<template>
  <div id="page">
    <div class="top">
      <p class="breadcrumb">Verification Center</p>
      <h1 class="title">Payment for Membership</h1>
    </div>
    <div class="main">
      <div class="card">
        <div class="card-top">
          <img class="verified" src="~assets/icons/verified_green.svg">
          <span class="title">Order Successfully Placed</span>
        </div>
        <div class="card-main">
          <p class="thanks">결제해 주셔서 감사합니다. 거래가 완료되었으며 이메일로 구매 영수증을 보냈습니다. www.paypal.com에서 본인 계정에 로그인하여 이 거래에 대한 세부정보를 볼 수 있습니다.</p>
          <div class="details">
            <span class="notification">Payment Details</span>
            <ul>
              <li>Membership Type: Standard</li>
              <li>Membership Valid Until: {{account.membership_valid_until}}</li>
              <li>Amount: $100</li>
            </ul>
          </div>
        </div>
        <div class="card-bottom">
          <a 
            class="button" 
            href="/dashboard">Go to Dashboard</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      account: 'auth/GET_ACCOUNT'
    })
  },
  methods: {
    init() {
      this.checkAccess()
    },
    checkAccess() {
      if (!this.isLoggedIn) location.replace('/')
    }
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

#page {
  padding: 40px 0;
}

.top {
  .breadcrumb {
    text-transform: uppercase;
    color: @color-font-gray;
    font-size: 16px;
  }
}

.main {
  margin-top: 60px;
  margin-bottom: 40px;
}
.card {
  margin: 0 auto;
  max-width: 500px;
  padding: 30px;
  border-radius: @border-radius;
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.09),
    0px 8px 20px 7px rgba(0, 0, 0, 0.02);
}
.card-top {
  text-align: center;
  .verified {
    width: 34px;
    height: 34px;
  }
  .title {
    display: block;
    margin-top: 4px;
    color: @color-light-green;
    font-weight: 500;
  }
}
.card-main {
  margin-top: 40px;

  .details {
    margin-top: 30px;
  }
  .notification {
    text-transform: uppercase;
    color: @color-deep-gray;
    font-size: 15px;
    font-weight: 500;
  }
  ul {
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
  li {
    margin-top: 4px;
  }
}

.card-bottom {
  margin-top: 30px;
  text-align: center;
  .button {
    display: inline-block;
    font-weight: 500;
    font-size: 15px;
    text-transform: uppercase;
    border-radius: @border-radius;
    text-decoration: none;
    background-color: @color-orange;
    color: @color-white;
    padding: 11px 20px;
  }
}
</style>
