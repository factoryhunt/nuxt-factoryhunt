<template>
  <section class="dashboard-page-container">
    <!-- Left-side -->
    <div class="left-container">
      <div class="profile-container">
        <div class="profile-inner-container">
          <div class="menu-container">
            <nuxt-link id="item-account-edit" class="menu" to="/dashboard/account">{{ $t('dashboardMyAccount.editAccount') }}</nuxt-link>
            <nuxt-link id="item-password-edit" class="menu" to="/dashboard/account/password">{{ $t('dashboardMyAccount.changePassword') }}</nuxt-link>
            <!--<a id="item-language" class="menu" href="/dashboard/account/language" v-lang.language></a>-->
            <nuxt-link id="item-management" class="menu" to="/dashboard/account/management">{{ $t('dashboardMyAccount.management') }}</nuxt-link>
            <!--<button @click="routeCompanyPage" class="view-button button-white">See My Profile</button>-->
          </div>
        </div>
      </div>
    </div>

    <!-- Right-side -->
    <div class="right-container">
      <nuxt-child :account="account" :contact="contact"></nuxt-child>
    </div>

  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    layout: 'dashboard',
    computed: mapGetters({
      account: 'auth/GET_ACCOUNT',
      contact: 'auth/GET_CONTACT'
    }),
    methods: {
      highlightNavigationButton () {
        $(document).ready(() => {
          const { name } = this.$route
          this.unhighlightNavigationButton()
          if (name === 'dashboard-account') {
            $('#item-account-edit').attr('aria-selected', true)
          }
          if (name === 'dashboard-account-password') {
            $('#item-password-edit').attr('aria-selected', true)
          }
          if (name === 'dashboard-account-management') {
            $('#item-management').attr('aria-selected', true)
          }
        })
      },
      unhighlightNavigationButton() {
        $('#item-account-edit').attr('aria-selected', false)
        $('#item-password-edit').attr('aria-selected', false)
        $('#item-management').attr('aria-selected', false)
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
