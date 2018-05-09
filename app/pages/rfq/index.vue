<template>
  <div>
    <div class="body-container">
      <div id="page">
        <!-- Header -->
        <page-header/>

        <div class="page-container">
          <!-- Form -->
          <r-f-q-form
            :value="value"
            @input="onUpdated"/>

          <!-- Right Panel -->
          <right-panel
            :value="value"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/Header'
import RFQForm from './components/Form'
import RightPanel from './components/RightPanel'
export default {
  layout: 'minify',
  head: () => ({
    title: 'Request for Quotation'
  }),
  data: () => ({
    value: {
      title: '',
      category: ['aaa'],
      description: ''
    }
  }),
  components: {
    PageHeader,
    RFQForm,
    RightPanel
  },
  methods: {
    onUpdated(value) {
      const keys = Object.keys(value)
      const key = keys[0]
      this.value[keys[0]] = value[keys[0]]
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/rfq/index';
</style>
