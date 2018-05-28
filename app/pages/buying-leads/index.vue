<template>
  <div id="contents">
    <div class="body-container">
      <!-- Header -->
      <page-header/>
      <!-- Contents Body -->
      <div id="contents__body">
        <!-- Left Nav Bar -->
        <navigation-bar
          :categories="categories"
          v-model="value.categorySearch"/>
        <!-- Feeds -->
        <feed 
          :user="this.userData"
          :feeds="this.feeds"/>

        <!-- Right Activities or Ads -->
        <activity
          :user="this.userData"/>
      </div>
    </div>
  </div>
</template>

<script>
// components
import PageHeader from './components/Header'
import NavigationBar from './components/NavigationBar'
import Feed from './components/Feed'
import Activity from './components/Activity'
// models
import Categories from '~/assets/models/categories.json'
import { mapGetters } from 'vuex'
// libs
import axios from '~/plugins/axios'
const BUYING_LEADS = 'Buying Leads'
export default {
  scrollToTop: true,
  layout: 'feed',
  head() {
    return {
      title: BUYING_LEADS,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${BUYING_LEADS} | Factory Hunt`
        },
        { hid: 'og-title', property: 'og:title', content: `${BUYING_LEADS}` },
        {
          hid: 'og-description',
          property: 'og:description',
          content: `${BUYING_LEADS}`
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `factoryhunt.com/buying-leads`
        },
        { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
        {
          hid: 'twitter-title',
          property: 'twitter:title',
          content: `Buying Leads | Factory Hunt`
        },
        {
          hid: 'twitter-description',
          property: 'twitter:description',
          content: `Buying Leads | Factory Hunt`
        },
        {
          hid: 'twitter-domain',
          property: 'twitter:domain',
          content: `https://www.factoryhunt.com/buying-leads`
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.factoryhunt.com/buying-leads`
        }
      ]
    }
  },
  components: {
    PageHeader,
    NavigationBar,
    Feed,
    Activity
  },
  async asyncData({ error }) {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )
      return {
        feeds: data
      }
    } catch (err) {
      console.log('err')
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => ({
    categories: Categories,
    value: {
      categorySearch: ''
    }
  }),
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    })
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/buying_leads/index';
@section-margin: 40px;

#contents {
  padding: @section-margin 0;
}
#contents__body {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  margin-top: @section-margin;
}
</style>
