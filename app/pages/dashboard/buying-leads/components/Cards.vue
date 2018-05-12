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
          <img src="https://zdnet2.cbsistatic.com/hub/i/r/2017/07/18/071068d1-e257-4abf-811d-48a626f621f7/resize/770xauto/72e298cc964f48604e0edb0a3ee72339/bear.jpg">
        </div>
        <!-- Title -->
        <h2 class="title section">{{getTitle(buyingLead.title)}}</h2>
        <!-- Description -->
        <p class="description section">{{getDescription(buyingLead.description)}}</p>
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
            <div>
              <span @click="onViewButton(buyingLead.domain)">View</span> 
              | 
              <span @click="onEditButton(buyingLead.domain)">Edit</span></div>
            <div><span @click="onDeleteButton(buyingLead.buying_lead_id)">Delete</span></div>
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
    onViewButton(domain) {
      this.$emit('onViewBuyingLead', domain)
    },
    onEditButton(domain) {
      this.$emit('onEditBuyingLead', domain)
    },
    onDeleteButton(buying_lead_id) {
      // Blur Card
      const $cardContainer = this.$refs[`cardContainer-${buying_lead_id}`][0]
      $cardContainer.classList.add('deleting')

      this.$emit('onDeleteBuyingLead', buying_lead_id)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/less/dashboard/index';
</style>
