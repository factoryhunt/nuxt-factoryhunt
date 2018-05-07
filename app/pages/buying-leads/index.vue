<template>
  <div id="contents">
    <!-- Header -->
    <page-header/>
    <!-- Contents Body -->
    <div id="contents__body">
      <!-- Left Nav Bar -->
      <navigation-bar
        :categories="categories"
        v-model="value.categorySearch"/>
      <!-- Feeds -->
      <feed :user="this.userData"/>

      <!-- Right Activities or Ads -->
      <activity/>
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
export default {
  layout: 'feed',
  components: {
    PageHeader,
    NavigationBar,
    Feed,
    Activity
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
  },
  mounted() {
    console.log(this.userData)
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
