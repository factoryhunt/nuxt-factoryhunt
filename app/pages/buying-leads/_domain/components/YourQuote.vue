<template>
  <div>
    <div class="section your-quote-container">
      <!-- Title -->
      <h4 class="section__title">Your Quote</h4>
      <div class="your-quote-wrapper">
        <card
          class="card">
          <text-input 
            placeholder="Suggest your product with a quote."
            @click="$emit('click')"/>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './common/Card'
import TextInput from '~/components/Inputs/Text'
export default {
  components: {
    Card,
    TextInput
  }
}
</script>

<style lang="less" scoped>
@import '../styles/index';
.your-quote-container {
  font-size: 13px;
}
</style>
