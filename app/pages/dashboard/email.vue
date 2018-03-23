<template>
  <section class="dashboard-page-container">
    <nuxt-child :account="account" :contact="contact"/>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import loader from '~/components/Loader'
  export default {
    layout: 'dashboard',
    components: {
      loader
    },
    asyncData ({redirect, store}) {
      const contactLevel = store.getters['auth/GET_CONTACT'].contact_level
      if (contactLevel !== '0') redirect('/dashboard')
    },
    data () {
      return {
      }
    },
    computed: mapGetters({
      account: 'auth/GET_ACCOUNT',
      contact: 'auth/GET_CONTACT',
    }),
    methods: {
      activateLoader () {
        const $loader = $('#loader')
        $loader.removeClass().addClass('spinkit-default')
      },
      deactivateLoader () {
        const $loader = $('#loader')
        $loader.removeClass().addClass('invisible')
      },
      applyJquery () {
        $(document).ready(() => {
          this.activateLoader()
        })
      }
    },
    mounted () {
      this.applyJquery()
    },
    watch: {
      '$route' () {
        this.applyJquery()
      }
    }
  }
</script>
