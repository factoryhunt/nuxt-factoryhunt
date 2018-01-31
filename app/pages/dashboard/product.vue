<template>
  <section class="dashboard-page-container">
    <loader id="loader"></loader>
    <nuxt-child :account="account" :products="products"></nuxt-child>
  </section>
</template>

<script>
  import $ from 'jquery'
  import axios from '~/plugins/axios'
  import { mapGetters } from 'vuex'
  import loader from '~/components/Loader'
  export default {
    layout: 'dashboard',
    components: {
      loader
    },
    data () {
      return {
        products: [],
        toggle: {
          isProductFetched: false
        }
      }
    },
    computed: mapGetters({
      account: 'auth/GET_ACCOUNT'
    }),
    methods: {
      async fetchProducts (id) {
        if (!id) return this.deactivateLoader()
        try {
          const { data } = await axios.get(`/api/data/product/account_id/${id}`)
          this.products = data
          this.toggle.isProductFetched = true
          this.deactivateLoader()
        } catch (err) {
          this.toggle.isProductFetched = true
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
      this.fetchProducts(this.account.account_id)
      this.applyJquery()
    }
  }
</script>
