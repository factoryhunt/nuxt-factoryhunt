<template>
  <section class="dashboard-page-container">
    <loader
      color="#f2583d"
      v-show="!toggle.isInboxFetched"></loader>
    <nuxt-child 
      :account="account" 
      :contact="contact" 
      :inbox="inbox" 
      v-if="toggle.isInboxFetched"></nuxt-child>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'
import loader from '~/components/Spinner/Dots'
export default {
  layout: 'dashboard',
  components: {
    loader
  },
  asyncData({ redirect, store }) {
    // const contactLevel = store.getters['auth/GET_CONTACT'].contact_level
    // if (contactLevel !== '0') redirect('/dashboard')
  },
  data() {
    return {
      inbox: [],
      toggle: {
        isInboxFetched: false
      }
    }
  },
  computed: mapGetters({
    account: 'auth/GET_ACCOUNT',
    contact: 'auth/GET_CONTACT'
  }),
  methods: {
    async fetchInbox(contact_id) {
      if (!contact_id) return this.deactivateLoader()
      const API = `/api/data/inbox/contact_id/${contact_id}`
      try {
        const { data } = await axios.get(API)
        this.inbox = data
        this.toggle.isInboxFetched = true
      } catch (err) {
        this.toggle.isInboxFetched = true
      }
    }
  },
  mounted() {
    this.fetchInbox(this.contact.contact_id)
  },
  watch: {
    $route() {
      this.fetchInbox(this.contact.contact_id)
    }
  }
}
</script>
