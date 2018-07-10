<template>
  <div class="container">
    <!-- Header -->
    <div class="maxwidth">
      <pricing-header/>
    </div>

    <!-- Pricing Table -->
    <pricing-table/>

    <!-- Benefits -->
    <div class="maxwidth">
      <pricing-faqs/>
    </div>
  </div>
</template>

<script>
import PricingHeader from './components/Header'
import PricingTable from './components/PricingTable'
import PricingFaqs from './components/Faqs'
export default {
  head() {
    return {
      title: 'Membership for Supplier',
      link: [{ hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/pricing` }]
    }
  },
  components: {
    PricingHeader,
    PricingTable,
    PricingFaqs
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
* {
  margin: 0;
  padding: 0;
}
.maxwidth {
  margin: 0 auto;
  max-width: 1040px;
}
</style>
