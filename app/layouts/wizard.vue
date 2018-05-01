<template>
  <div id="container">
    <form @submit.prevent="onSaveButton">
      <top-alert-bar/>

      <div id="wizard-container">
        <!-- Left Fixed Bar -->
        <div id="left-bar">
          <brand/>
          <p id="wizard-container__title">Submit Information</p>
          <ul>
            <li><a id="nav-menu-1" href="/signup/step1">Basic Company Information</a></li>
            <li><a id="nav-menu-2" href="/signup/step2">Contacts & Address</a></li>
            <li><a id="nav-menu-3" href="/signup/step3">Business Details</a></li>
            <li><a id="nav-menu-4" href="/signup/step4">Brand Images</a></li>
            <li><a id="nav-menu-5" href="/signup/step5">Certification & Awards</a></li>
          </ul>
        </div>

        <!-- Right Scrollable Bar -->
        <div id="right-container">
          <nuxt/>
        </div>
      </div>

      <!-- Bottom Fixed Bar -->
      <div id="bottom-bar-container">
        <div id="bottom-bar-wrapper">
          <button 
            id="action-button"
            :disabled="!toggle.canSave">Save & Continue</button>
          <a 
            id="skip-button"
            @click="onSkipThisStep">
            Skip this step <i class='fa fa-angle-right' aria-hidden='true'></i></a>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import TopAlertBar from '~/components/Alert/TopAlertBar'
import Brand from '~/components/Brand'
import RequiredIcon from '~/components/Icons/Required'
import { EventBus } from '~/eventBus'
export default {
  middleware: 'authenticated',
  head() {
    return {
      titleTemplate: '%s | Factory Hunt'
    }
  },
  components: {
    TopAlertBar,
    Brand,
    RequiredIcon
  },
  data() {
    return {
      toggle: {
        canSave: false,
        isLoading: false
      }
    }
  },
  methods: {
    listenEventBus() {
      this.enableSaveButton()
      this.disableSaveButton()
    },
    enableSaveButton() {
      EventBus.$on('enableSaveButton', () => {
        this.toggle.canSave = true
      })
    },
    disableSaveButton() {
      EventBus.$on('disableSaveButton', () => {
        this.toggle.canSave = false
      })
    },
    onSaveButton() {
      EventBus.$emit('onSaveButton')
    },
    onSkipThisStep() {
      EventBus.$emit('onSkipThisStep')
    },
    highlightNavigationBar() {
      const highlightNavMenu = id => {
        document.getElementById(`nav-menu-${id}`).className = 'highlighted'
      }

      const { name } = this.$route
      switch (name) {
        case 'signup-step1':
          highlightNavMenu(1)
          break
        case 'signup-step2':
          highlightNavMenu(2)
          break
        case 'signup-step3':
          highlightNavMenu(3)
          break
        case 'signup-step4':
          highlightNavMenu(4)
          break
        case 'signup-step5':
          highlightNavMenu(5)
          break
      }
    }
  },
  mounted() {
    this.highlightNavigationBar()
    this.listenEventBus()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';
</style>
