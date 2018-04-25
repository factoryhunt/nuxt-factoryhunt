<template>
  <div id="container">
    <top-alert-bar/>

    <div id="wizard-container">
      
      <!-- Left Fixed Bar -->
      <div id="left-bar">
        <div id="brand-container">
          <img 
            id="brand-logo"
            src="~assets/img/logo_orange_small.png" 
            alt="brand-logo"/>
          <p id="desc">Factory Hunt<br>Sign Up Wizard</p>
        </div>
        <ul>
          <li>Basic Company Information</li>
          <li>Contacts & Address</li>
          <li>Business Details</li>
          <li>Brand Images</li>
          <li>Certification & Awards</li>
        </ul>
      </div>

      <!-- v-on:change.native="activateSaveButton" -->
      <!-- Right Scrollable Bar -->
      <div id="right-container">
        <nuxt
          @activateSaveButton="activateSaveButton"
          @onSave="onSaveButton"/>
      </div>
    </div>
    <!-- Bottom Fixed Bar -->
    <div id="bottom-bar-container">
      <div id="bottom-bar-wrapper">
        <button 
          id="action-button"
          :disabled="!toggle.canSave"
          @click="onSaveButton">Save & Continue</button>
        <a id="skip-button" href="/dashboard">Skip this step <i class='fa fa-angle-right' aria-hidden='true'></i></a>
      </div>
    </div>

  </div>
</template>

<script>
import TopAlertBar from '~/components/Alert/TopAlertBar'
export default {
  head() {
    return {
      titleTemplate: '%s | Factory Hunt'
    }
  },
  components: {
    TopAlertBar
  },
  data() {
    return {
      toggle: {
        canSave: false
      }
    }
  },
  methods: {
    activateSaveButton() {
      this.toggle.canSave = true
    },
    onSaveButton() {
      console.log('onSaveButton')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';
</style>
