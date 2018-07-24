<template>
  <div class="wrapper">
    <div 
      class="card premium"
      v-if="!isMembershipUser && isUserSupplier">
      <h2 class="title mobile">Premium<br>Supplier Membership</h2>
      <h2 class="title desktop">Premium Supplier Membership</h2>
      <p class="description">
        Your company can be always exposed on top of search results.
      </p>
      <a 
        class="button"
        href="/pricing">
        See Details
      </a>
    </div>
    <div 
      class="card"
      v-if="isUserBuyer">
      <h2 class="title">How about get quotes?</h2>
      <p class="description">You can request quote to suppliers just for FREE.</p>
      <a 
        class="button gradient"
        href="/buying-leads">
        Request Quote
      </a>
    </div>
    <div 
      class="card"
      v-if="!isLoggedIn">
      <h2 class="title">Are you supplier?</h2>
      <p class="description">Your company can be exposed on this page just for FREE.</p>
      <a 
        class="button gradient"
        href="/signup">
        Get Started
      </a>
    </div>
    <div 
      class="card"
      v-if="!isUserBuyer && !isUserSupplier && isLoggedIn">
      <h2 class="title">Business Type</h2>
      <p class="description">Please let us know if you are a buyer or supplier.</p>
      <a 
        class="button gradient"
        href="/signup/step1">
        Get Started
      </a>
    </div>
  </div>
</template>

<script>
import VButton from '~/components/Button'
import { mapGetters } from 'vuex'
export default {
  components: {
    VButton
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      isUserBuyer: 'auth/IS_USER_BUYER',
      isUserSupplier: 'auth/IS_USER_SUPPLIER',
      isMembershipUser: 'auth/IS_MEMBERSHIP_USER'
    })
  }
}
</script>


<style lang="less" scoped>
@import '~assets/css/index';

* {
  margin: 0;
  padding: 0;
}

.card {
  border: 1px solid @color-border-gray;
  border-radius: @border-radius;
  background-color: @color-bg-gray;
  padding: 20px;
  margin-top: 1rem;

  @media (min-width: 1128px) {
    margin-top: 2rem;
  }

  &:first-child {
    margin-top: 0;
  }
}
.title {
  font-size: 20px;
  @media (min-width: 1128px) {
  }
}
.description {
  margin-top: 1rem;
}
.button {
  display: block;
  color: @color-white !important;
  width: 100%;
  margin-top: 2rem;
  padding: 11px;
  border-radius: @border-radius;
  text-decoration: none !important;
  text-align: center;
}
.gradient {
  background-color: transparent;
  background: @color-link;
  background: linear-gradient(320deg, rgb(73, 155, 199) 0%, rgba(49, 127, 169, 1) 100%);

  &:hover {
    background-color: transparent;
  }
}

.premium {
  background-color: @color-font-black;
  color: @color-white !important;

  .description {
    color: #bdbcbc;
  }
  .button {
    background-color: @color-premium-red;
    color: @color-white !important;

    &:hover {
      background-color: #b62515;
    }
  }
}
</style>
