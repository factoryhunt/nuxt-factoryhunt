<template>
  <div class="component-container">
    <div class="body-container">
      <div class="tab-container">
        <nuxt-link id="item-dashboard" class="tab" to="/dashboard">{{ $t('navigationBar.dashboard') }}</nuxt-link>
        <nuxt-link id="item-company" class="tab" to="/dashboard/company">{{ $t('navigationBar.company') }}</nuxt-link>
        <nuxt-link id="item-product" class="tab" to="/dashboard/product">{{ $t('navigationBar.product') }}</nuxt-link>
        <!--<nuxt-link id="item-inbox" class="tab" to="/dashboard/inbox">{{ $t('navigationBar.inbox') }}</nuxt-link>-->
        <nuxt-link id="item-account" class="tab" to="/dashboard/account">{{ $t('navigationBar.account') }}</nuxt-link>
        <nuxt-link id="item-email" class="tab" to="/dashboard/email" v-show="contact.contact_level === '0'">{{ $t('navigationBar.email') }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: mapGetters({
      contact: 'auth/GET_CONTACT'
    }),
    methods: {
      highlightNavigationButton () {
        const { name } = this.$route
        this.unhighlightNavigationButton()
        if (name === 'dashboard') {
          $('#item-dashboard').attr('aria-selected', true)
        }
        if (name.indexOf('company') !== -1) {
          $('#item-company').attr('aria-selected', true)
        }
        if (name.indexOf('dashboard-product') !== -1 ) {
          $('#item-product').attr('aria-selected', true)
        }
        if (name.indexOf('dashboard-inbox') !== -1 ) {
          $('#item-inbox').attr('aria-selected', true)
        }
        if (name.indexOf('dashboard-account') !== -1 ) {
          $('#item-account').attr('aria-selected', true)
        }
        if (name.indexOf('dashboard-email') !== -1 ) {
          $('#item-email').attr('aria-selected', true)
        }
      },
      unhighlightNavigationButton () {
        $('#item-dashboard').attr('aria-selected', false)
        $('#item-company').attr('aria-selected', false)
        $('#item-product').attr('aria-selected', false)
        $('#item-inbox').attr('aria-selected', false)
        $('#item-account').attr('aria-selected', false)
        $('#item-email').attr('aria-selected', false)
      }
    },
    mounted () {
      this.highlightNavigationButton()
    },
    watch: {
      '$route' () {
        this.highlightNavigationButton()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  // Global
  .component-container {
    background-color: @color-font-base;
    width: 100%;
    height: 40px;
    margin: 0 !important;
  }

  .tab-container {

    .tab {
      color: @color-menu-gray;
      line-height: 40px;
      margin-right: 20px;
      font-size: 15px;
      font-weight: 400;
      text-decoration: none;

      &:hover {
        color: @color-white;
        cursor: pointer;
      }
    }
    .tab[aria-selected="true"] {
      color: @color-white;
    }
  }
</style>
