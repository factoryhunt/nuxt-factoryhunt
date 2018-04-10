<template>
  <section class="dashboard-page-container">
    <!-- Left-side -->
    <div class="left-container">
      <div class="profile-container">
        <div class="profile-inner-container">
          <div class="menu-container">
            <a id="item-company-edit" class="menu" href="/dashboard/company">{{ $t('dashboardCompany.editCompany') }}</a>
            <a id="item-domain-edit" class="menu" href="/dashboard/company/domain">{{ $t('dashboardCompany.editDomain') }}</a>
            <a id="item-image-edit" class="menu" href="/dashboard/company/image">{{ $t('dashboardCompany.images') }}</a>
            <a id="item-certifications-edit" class="menu" href="/dashboard/company/certifications">{{ $t('dashboardCompany.certifications') }}</a>
            <button @click="routeCompanyPage" class="view-button button-white">{{ $t('dashboardCompany.viewButton') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right-side -->
    <div class="right-container">
      <nuxt-child :account="account"/>
    </div>

  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import { mapGetters } from 'vuex'
  export default {
    layout: 'dashboard',
    computed: mapGetters({
      account: 'auth/GET_ACCOUNT'
    }),
    methods: {
      routeCompanyPage () {
        window.open(`/${this.account.domain}`)
      },
      highlightNavigationButton () {
        $(document).ready(() => {
          const { name } = this.$route
          this.unhighlightNavigationButton()
          if (name === 'dashboard-company') {
            $('#item-company-edit').attr('aria-selected', true)
          }
          if (name === 'dashboard-company-domain') {
            $('#item-domain-edit').attr('aria-selected', true)
          }
          if (name === 'dashboard-company-image') {
            $('#item-image-edit').attr('aria-selected', true)
          }
          if (name === 'dashboard-company-certifications') {
            $('#item-certifications-edit').attr('aria-selected', true)
          }
        })
      },
      unhighlightNavigationButton() {
        $('#item-company-edit').attr('aria-selected', false)
        $('#item-domain-edit').attr('aria-selected', false)
        $('#item-image-edit').attr('aria-selected', false)
        $('#item-certifications-edit').attr('aria-selected', false)
      }
    },
    mounted () {
      this.highlightNavigationButton()
    },
    watch: {
      '$route.path' () {
        this.highlightNavigationButton()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  // Global
  .contents {
    margin-top: 0;
    margin-bottom: 0;
  }

  .dashboard-page-container {

    .left-container {
      .profile-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 220px;

        .profile-inner-container {
          position: relative;
          text-align: left;

          .menu {
            color: @color-font-base;
            text-decoration: none;
            display: block;
            font-weight: 300;
            font-size: 17px;
            margin-bottom: 15px;

            &:hover {
              font-weight: 700;
              cursor: pointer;
            }
            &[aria-selected="true"] {
              font-weight: 700;
              font-size:19px;
            }
          }
          button {
            color: @color-font-base;
            border: 1px solid @color-input-placeholder;
            width: 95%;
            font-size:15px;
            margin-top: 40px;
            padding-top: 9px;
            padding-bottom:9px;
            font-weight: 700;
          }
        }
      }
    }
    .right-container {
      padding-left: 240px;
    }
  }
</style>
