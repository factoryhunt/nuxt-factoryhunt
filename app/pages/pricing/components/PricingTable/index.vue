<template>
  <main class="wrapper">
    <div class="maxwidth">
      <div class="table">
        <!-- Free -->
        <div
          class="table-item free">
          <h2 class="title">Free</h2>
          <div class="price-wrapper">
            <p class="price"><i>$ 0</i></p>
          </div>
          <a 
            class="button" 
            href="/signup">Sign Up</a>
          <ul>
            <li>Modern Company Webpage</li>
            <li>Online Product Catalog</li>
            <li>Product Posting (Limited)</li>
            <li>Submit Quotes for Buying Leads (Limited)</li>
          </ul>
        </div>
        <!-- Standard -->
        <div
          class="table-item">
          <h2 class="title">Standard</h2>
          <div class="price-wrapper">
            <p class="line"><i>$ 500/year</i></p>
            <p class="sale"><span>$ 100/year</span><i class="promotion">Limited Promotion</i> </p>
          </div>
          <paypal-payment/>
          <ul>
            <li>Modern Company Webpage</li>
            <li>Online Product Catalog</li>
            <li>Priority Ranking</li>
            <li>Verified Icon</li>
            <li>Product Posting (Unlimited)</li>
            <li>Submit Quotes for Buying Leads (Unlimited)</li>
            <li>Access to Buyer Information</li>
            <li>Free Display Marketing</li>
            <li>Personalized Customer Service</li>
          </ul>
        </div>
        <!-- Premium -->
        <div
          class="table-item premium">
          <h2 class="title">Enterprise</h2>
          <div class="price-wrapper">
            <p class="small"><i>Please tell us what you need.</i></p>
          </div>
          <a 
            href="/contact"
            class="button coming-soon">Contact Us</a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PaypalPayment from '~/components/Payments/Paypal'
import { mapGetters } from 'vuex'
export default {
  components: {
    PaypalPayment
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  }
}
</script>


<style>
.body-container {
  position: unset !important;
  max-width: unset;
}
</style>

<style lang="less" scoped>
@import '~assets/css/index';

* {
  margin: 0;
  padding: 0;
}

.wrapper {
  position: relative;

  @media (min-width: 1128px) {
    // margin-top: 60px;
  }

  &::after {
    position: absolute;
    display: none;
    z-index: -1;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 350px;
    background: @color-orange;
    background: linear-gradient(170deg, rgba(242, 88, 61, 1) 0%, rgba(167, 63, 44, 1) 100%);

    @media (min-width: 744px) {
    }
    @media (min-width: 1128px) {
      display: unset;
    }
  }
}
.maxwidth {
  max-width: 1040px;
  margin: 0 auto;
  padding-top: 20px;

  @media (min-width: 744px) {
  }
  @media (min-width: 1128px) {
    padding-top: 80px;
  }
}
.table {
  display: block;
  justify-content: space-between;
  background-color: @color-white;
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.09),
    0px 8px 20px 7px rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 11px;

  @media (min-width: 1128px) {
    display: flex;
    padding: 60px 30px;
  }
}
.table-item {
  flex: 1;
  border-radius: @border-radius;
  padding: 20px;

  .title {
    font-weight: 500;
    text-align: center;
  }
}

.price-wrapper {
  padding: 14px 0;
  text-align: center;
  height: 97px;
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
}
.line {
  margin-top: 4px;
  text-decoration: line-through;
}
.sale {
  font-size: 18px;
}
.small {
  font-size: 20px;
}
.promotion {
  margin-left: 5px;
  font-weight: 600;
  color: @color-premium-red;
}

.button {
  display: block;
  padding: 11px 20px;
  text-decoration: none !important;
  text-align: center;
  background-color: @color-white;
  border: 1px solid @color-orange;
  border-radius: @border-radius;
  color: @color-orange !important;

  &.standard {
    background-color: @color-orange;
    color: @color-white !important;
  }

  &.coming-soon {
    border: 1px solid @color-border-gray;
    background-color: @color-bg-gray;
    color: @color-font-black !important;
    // opacity: 0.5;
    // cursor: not-allowed;
  }
}
ul {
  list-style: none;
  margin-top: 40px;
}
li {
  font-size: 16px;
  padding: 11px;
  border-bottom: 1px solid @color-border-gray;

  &:last-child {
    border-bottom: 0;
  }
}

.free {
  border-bottom: 1px solid @color-border-gray;
  border-right: 0;
  @media (min-width: 744px) {
  }
  @media (min-width: 1128px) {
    border-bottom: 0;
    border-right: 1px solid @color-border-gray;
  }
}
.premium {
  border-top: 1px solid @color-border-gray;
  border-left: 0;
  // background-color: @color-font-black;
  // color: @color-white;
  // opacity: 0.5;

  @media (min-width: 744px) {
  }
  @media (min-width: 1128px) {
    border-top: 0;
    border-left: 1px solid @color-border-gray;
  }
}
</style>
