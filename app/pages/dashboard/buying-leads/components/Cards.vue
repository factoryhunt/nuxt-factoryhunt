<template>
  <div>
    <ul
      class="card-wrapper">
      <li 
        class="card-container"
        v-for="buyingLead in buying_leads"
        :key="buyingLead.buying_lead_id"
        :ref="`cardContainer-${buyingLead.buying_lead_id}`">
        <div class="img-container">
          <img :src="getImageUrl(buyingLead.location)">
        </div>
        <!-- Title -->
        <h2 class="title section">{{getTitle(buyingLead.title)}}</h2>
        <!-- Description -->
        <p class="description section"
          @click="onViewButton(buyingLead.domain)"
          >{{getDescription(buyingLead.description)}}</p>
        <!-- How many quotes -->
        <p class="quotes section">3 Quoted</p>
        <!-- Status -->
        <div class="status-container section">
          <div class="status-wrapper">
            <!-- Progress -->
            <div><span :class="['status', `${getStatus(buyingLead.status)}`]">{{buyingLead.status}}</span></div>
            <!-- Due date -->
            <div><span class="due-date">{{buyingLead.duration}} Days Left</span></div>
          </div>
        </div>
        <!-- Actions -->
        <div class="action-container section">
          <div class="action-wrapper">
            <div><span @click="onEditButton(buyingLead.domain)">Edit</span></div>
            <div><span @click="onArchiveButton(buyingLead.buying_lead_id)">Archive</span></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['buying_leads'],
  methods: {
    getTitle(title) {
      return title || 'Title of Your RFQ'
    },
    getDescription(desc) {
      return desc || 'Please fill in description about what you need'
    },
    getStatus(status) {
      return status.toLowerCase()
    },
    getImageUrl(url) {
      return url ? url : require('~/assets/icons/pictures.svg')
    },
    onViewButton(domain) {
      this.$emit('onViewBuyingLead', domain)
    },
    onEditButton(domain) {
      this.$emit('onEditBuyingLead', domain)
    },
    onArchiveButton(buying_lead_id) {
      // Blur Card
      const $cardContainer = this.$refs[`cardContainer-${buying_lead_id}`][0]
      $cardContainer.classList.add('deleting')

      this.$emit('onArchiveBuyingLead', buying_lead_id)
    }
  },
  mounted() {
    console.log(this.buying_leads)
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/less/dashboard/index';
</style>
