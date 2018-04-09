<template>
  <div class="component-container">
    <div class="body-container">
      <div class="tab-container">
        <a id="item-dashboard" class="tab" href="/dashboard">{{ $t('navigationBar.dashboard') }}</a>
        <a id="item-company" class="tab" href="/dashboard/company">{{ $t('navigationBar.company') }}</a>
        <a id="item-product" class="tab" href="/dashboard/product">{{ $t('navigationBar.product') }}</a>
        <a id="item-inbox" class="tab" href="/dashboard/inbox" v-show="contact.contact_level === '0'">{{ $t('navigationBar.inbox') }}</a>
        <a id="item-account" class="tab" href="/dashboard/account">{{ $t('navigationBar.account') }}</a>
        <a id="item-email" class="tab" href="/dashboard/email" v-show="contact.contact_level === '0'">{{ $t('navigationBar.email') }}</a>
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
