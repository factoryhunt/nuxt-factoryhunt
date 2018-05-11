<template>
  <div>
    <ul
      class="card-wrapper">
      <li 
        class="card-container"
        ref="cardContainer"
        v-for="(buyingLead, i) in buying_leads"
        :key="i">
        <div class="img-container">
          <img src="https://zdnet2.cbsistatic.com/hub/i/r/2017/07/18/071068d1-e257-4abf-811d-48a626f621f7/resize/770xauto/72e298cc964f48604e0edb0a3ee72339/bear.jpg">
        </div>
        <!-- Title -->
        <h2 class="title section">{{getTitle(buyingLead)}}</h2>
        <!-- Description -->
        <p class="description section">{{buyingLead.description}}</p>
        <!-- How many quotes -->
        <p class="quotes section">3 Quoted</p>
        <!-- Status -->
        <div class="status-container section">
          <div class="status-wrapper">
            <!-- Progress -->
            <div><span>Pending</span></div>
            <!-- Due date -->
            <div><span class="due-date">{{buyingLead.duration}} Days Left</span></div>
          </div>
        </div>
        <!-- Actions -->
        <div class="action-container section">
          <div class="action-wrapper">
            <div><span>View</span> | <span>Edit</span></div>
            <div><span @click="onDelete(buyingLead.buying_lead_id)">Delete</span></div>
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
    getTitle(buyingLead) {
      return buyingLead.title || 'Title'
    },
    onDelete(buying_lead_id) {
      this.$emit('onDeleteBuyingLead', buying_lead_id)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/less/dashboard/index';
</style>
