<template>
  <section class="dashboard-page-container">
    <loader id="loader"></loader>
    <nuxt-child :account="account" :contact="contact" :inbox="inbox" v-if="toggle.isInboxFetched"></nuxt-child>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
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
        inbox: [],
        toggle: {
          isInboxFetched: false
        }
      }
    },
    computed: mapGetters({
      account: 'auth/GET_ACCOUNT',
      contact: 'auth/GET_CONTACT',
    }),
    methods: {
      async fetchInbox (id) {
        if (!id) return this.deactivateLoader()
        try {
          const { data } = await axios.get(`/api/data/inbox/contact_id/${id}`)
          this.inbox = data
          this.toggle.isInboxFetched = true
          this.deactivateLoader()
        } catch (err) {
          this.toggle.isInboxFetched = true
          this.deactivateLoader()
        }
      },
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
      this.fetchInbox(this.contact.contact_id)
    },
    watch: {
      '$route' () {
        this.applyJquery()
        this.fetchInbox(this.contact.contact_id)
      }
    }
  }
</script>
