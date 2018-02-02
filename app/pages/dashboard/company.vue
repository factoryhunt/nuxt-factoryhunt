<template>
  <section class="dashboard-page-container">
    <!-- Left-side -->
    <div class="left-container">
      <div class="profile-container">
        <div class="profile-inner-container">
          <div class="menu-container">
            <nuxt-link id="item-company-edit" class="menu" to="/dashboard/company">{{ $t('dashboardCompany.editCompany') }}</nuxt-link>
            <nuxt-link id="item-domain-edit" class="menu" to="/dashboard/company/domain">{{ $t('dashboardCompany.editDomain') }}</nuxt-link>
            <nuxt-link id="item-image-edit" class="menu" to="/dashboard/company/image">{{ $t('dashboardCompany.photos') }}</nuxt-link>
            <!--<a id="item-certification-upload" class="menu" href="/dashboard/company/certifications">인증서 등록</a>-->
            <button @click="routeCompanyPage" class="view-button button-white">{{ $t('dashboardCompany.viewButton') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right-side -->
    <div class="right-container">
      <nuxt-child :account="account"></nuxt-child>
    </div>

  </section>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  export default {
    layout: 'dashboard',
    computed: mapGetters({
      account: 'auth/GET_ACCOUNT'
    }),
    methods: {
      routeCompanyPage () {
        location.href = `/${this.account.domain}`
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
          if (name === 'dashboard-company-certification') {
            $('#item-certification-upload').attr('aria-selected', true)
          }
        })
      },
      unhighlightNavigationButton() {
        $('#item-company-edit').attr('aria-selected', false)
        $('#item-domain-edit').attr('aria-selected', false)
        $('#item-image-edit').attr('aria-selected', false)
        $('#item-certification-edit').attr('aria-selected', false)
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
        width: 240px;

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
      padding-left: 260px;
    }
  }
</style>
