<template>
  <div id="contents">
    <div class="body-container">
      <!-- Header -->
      <page-header/>
      <!-- Contents Body -->
      <div id="contents__body">
        <!-- Left Nav Bar -->
        <navigation-bar
          :categories="category"
          v-model="value.categorySearch"/>
        <!-- Feeds -->
        <div class="feed-wrapper">
          <feed 
            :user="this.userData"
            :feeds="this.feeds"/>
          <loader 
            class="loader"
            color="#f2583d"
            v-show="toggle.isFetching"/>
        </div>
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
import Loader from '~/components/Spinner/Dots'
// models
import Category from '~/assets/models/category.json'
// libs
import { mapGetters } from 'vuex'
import axios from '~/plugins/axios'
const BUYING_LEADS = 'Buying Leads'
export default {
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
    Activity,
    Loader
  },
  data: () => ({
    feeds: [],
    api: '',
    category: [],
    feedOffset: 0,
    value: {
      categorySearch: ''
    },
    toggle: {
      canFetch: true,
      isFetching: false
    }
  }),
  async asyncData({ error, query }) {
    let { category } = query

    let API = new URL('http://localhost:3000/api/data/buying_leads')
    if (category) API.searchParams.append('category', category)

    try {
      const { data } = await axios.get(API.href)
      return {
        feeds: data,
        api: API
      }
    } catch (err) {
      console.log('err')
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/GET_USER'
    })
  },
  methods: {
    init() {
      this.addEventListeners()
      this.filterCategory()
    },
    addEventListeners() {
      window.addEventListener('scroll', event => {
        const isBottomOfScreen = window.innerHeight + window.scrollY >= document.body.offsetHeight

        if (isBottomOfScreen) this.fetchMoreFeeds()
      })
    },
    filterCategory() {
      const rx = new RegExp('..000000$')
      this.category = Category.filter(cat => {
        const filter = rx.test(cat.id)
        return filter
      })
    },
    async fetchMoreFeeds() {
      if (!this.toggle.canFetch) return
      if (this.toggle.isFetching) return

      this.toggle.isFetching = true
      this.feedOffset += 1
      const lastFeedLength = this.feeds.length

      let url = new URL(this.api)
      url.searchParams.append('offset', this.feedOffset)

      console.log(url)

      try {
        const { data } = await axios.get(url.href)
        this.feeds = this.feeds.concat(data)
        const isLastFeed = lastFeedLength === this.feeds.length
        if (isLastFeed) this.toggle.canFetch = false
        this.toggle.isFetching = false
      } catch (err) {
        console.log('err')
        this.toggle.isFetching = false
      }
    }
  },
  mounted() {
    this.init()
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

.feed-wrapper {
  flex: 1 !important;
  width: 100%;
  min-height: 100vh;
}
.loader {
  display: block;
  margin-top: 30px !important;
}
</style>
