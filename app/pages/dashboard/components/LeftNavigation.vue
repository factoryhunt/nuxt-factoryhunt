<template>
  <div id="wrapper">
    
    <!-- Profile -->
    <div class="card profile">
      <img 
        class="logo-img"
        :src="getLogoImg" 
        alt="company-logo-image">
      <div class="details">
        <p class="name-company">
          <span v-show="getUserName">{{getUserName}}</span> @ <span class="company">{{account.account_name}}</span>
        </p>
        <span 
          class="contact-title"
          v-show="contact.contact_title">{{contact.contact_title}}</span>
        <div class="navigation">
          <a 
            class="link" 
            :href="getMyWebsite"
            v-show="isUserSupplier">View website</a>
          <a 
            class="link" 
            href="/dashboard/company">Edit</a>
        </div>
      </div>
    </div>
    <!-- Account Details -->
    <div 
      class="card membership"
      v-show="isUserSupplier">
      <span class="title">Account Details</span>
      <dl class="contents">
        <dt>Membership Type</dt>
        <dd>{{getAccountType}}</dd>
        <dt>Valid Date</dt>
        <dd>{{getMembershipValidDate}}</dd>
      </dl>
      <button 
        v-show="!account.membership_left_time"
        class="pricing-button" 
        @click="routePricingPage()">Upgrade</button>
    </div>
  </div>
</template>

<script>
import { getName } from '~/utils/text'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      account: 'auth/GET_ACCOUNT',
      contact: 'auth/GET_CONTACT',
      isUserSupplier: 'auth/IS_USER_SUPPLIER'
    }),
    getLogoImg() {
      const { logo_url } = this.account

      return logo_url ? logo_url : require('~/assets/img/temp-logo-image_english_512.png')
    },
    getUserName() {
      const { first_name, last_name } = this.contact
      return getName(first_name, last_name)
    },
    getMyWebsite() {
      return this.account.domain
    },
    getAccountType() {
      const { membership_type, membership_left_time } = this.account

      const type = membership_left_time ? membership_type : 'Free'

      return type
    },
    getMembershipValidDate() {
      const { membership_left_time, membership_valid_until } = this.account

      const date = membership_left_time ? membership_valid_until.substring(0, 10) : 'Unlimited'

      // const test = new Date(membership_valid_until).format('{yyyy}-{MM}-{dd} {hh}')

      return date
    }
  },
  methods: {
    routePricingPage() {
      location.href = '/pricing'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

* {
  margin: 0;
  padding: 0;
}

@card-padding: 20px;

#wrapper {
  width: 240px;
}

.card {
  border: 1px solid @color-border-gray;
  border-radius: @border-radius;
  overflow: hidden;
  margin-top: 30px;

  &:first-child {
    margin-top: 0;
  }

  .title {
    display: block;
    font-weight: 500;
    color: @color-deep-gray;
    text-transform: uppercase;
    font-size: 15px;
  }

  dl {
    margin-top: 20px;
  }
  dt {
    display: block;
    font-size: 15px;
    margin-top: 12px;
    color: @color-font-gray;

    &:first-child {
      margin-top: 0;
    }
  }
  dd {
    display: block;
    font-size: 16px;
  }
}

.profile {
  text-align: center;

  .logo-img {
    display: block;
    width: 100%;
    object-fit: contain;
    border-bottom: 1px solid @color-border-gray;
  }
  .details {
    padding: @card-padding;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .company {
    color: @color-link;
    font-weight: 500;
  }
  .contact-title {
    color: @color-font-gray;
    font-size: 17px;
  }
  .navigation {
    margin-top: 40px;
  }
  .link {
    display: block;
    text-decoration: none;
    margin-top: 10px;
    border: 1px solid @color-border-gray;
    color: @color-font-black;
    padding: 6px;
    border-radius: @border-radius;
    font-size: 15px;
    font-weight: 500;
    text-transform: uppercase;
    transition: background-color 0.2s;

    &:first-child {
      margin-top: 0;
    }

    &:hover {
      background-color: @color-bg-gray;
    }
  }
}

.membership {
  padding: @card-padding;

  .pricing-button {
    display: block;
    margin-top: 20px;
    background-color: @color-premium-red;
    text-transform: uppercase;
    padding: 8px;
    font-weight: 500;
    font-size: 14px;
    width: 100%;
    color: @color-white;
    border: 0;
    border-radius: @border-radius;
  }
}
</style>
