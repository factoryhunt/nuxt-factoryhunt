<template>
  <div id="container">
    <form @submit.prevent="onSaveButton">
      <top-alert-bar id="alert"/>

      <div id="wizard-container">
        <!-- Left Fixed Bar -->
        <div id="left-bar">
          <brand/>
          <p id="wizard-container__title">Submit Information</p>
          <ul>
            <li><a id="nav-menu-1" href="/signup/step1">Basic Company Information</a></li>
            <li><a id="nav-menu-2" href="/signup/step2">Business Details</a></li>
            <li><a id="nav-menu-3" href="/signup/step3">Business Address</a></li>
            <li><a id="nav-menu-4" href="/signup/step4">Contact Details</a></li>
            <li><a id="nav-menu-5" href="/signup/step5">Brand Images</a></li>
            <!-- <li><a id="nav-menu-6" href="/signup/step6">Certification & Awards</a></li> -->
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
            :disabled="!toggle.canSave">
            <spinner
              color="#FFF"
              width="141px"
              v-show="toggle.isLoading"/>
            <span v-show="!toggle.isLoading">Save & Continue</span>
          </button>
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
import Spinner from '~/components/Spinner/Dots'
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
    Spinner,
    Brand,
    RequiredIcon
  },
  data: () => ({
    toggle: {
      canSave: false,
      isLoading: false
    }
  }),
  methods: {
    preventEvents() {
      this.preventFileDragEvent()
      this.preventEnterKeySubmitEvent()
    },
    preventEnterKeySubmitEvent() {
      $(document).ready(() => {
        $('input').keydown(event => {
          if (event.keyCode === 13) {
            event.preventDefault()
          }
        })
      })
    },
    preventFileDragEvent() {
      const $container = document.getElementById('container')
      $container.addEventListener('dragenter', this.dragEnter, false)
      $container.addEventListener('dragover', this.dragHover, false)
      $container.addEventListener('drop', this.drop, false)
      $container.addEventListener('dragleave', this.dragLeave, false)
    },
    dragHover(e) {
      e.stopPropagation()
      e.preventDefault()
    },
    dragEnter(e) {
      this.dragHover(e)
    },
    drop(e) {
      this.dragHover(e)
    },
    dragLeave(e) {
      this.dragHover(e)
    },
    listenEventBus() {
      this.enableSaveButton()
      this.disableSaveButton()
      this.onLoadingFinished()
      this.onLoadingFailed()
    },
    enableSaveButton() {
      EventBus.$on('enableSaveButton', () => (this.toggle.canSave = true))
    },
    disableSaveButton() {
      EventBus.$on('disableSaveButton', () => (this.toggle.canSave = false))
    },
    onLoadingFinished() {
      EventBus.$on('onLoadingFinished', () => this.uploadFinished())
    },
    onLoadingFailed() {
      EventBus.$on('onLoadingFailed', () => this.uploadFinished())
    },
    uploadStarted() {
      this.toggle.isLoading = true
      this.toggle.canSave = false
    },
    uploadFinished() {
      this.toggle.isLoading = false
      this.toggle.canSave = true
    },
    onSaveButton() {
      this.uploadStarted()
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
        case 'signup-step6':
          highlightNavMenu(6)
          break
      }
    }
  },
  mounted() {
    this.highlightNavigationBar()
    this.listenEventBus()
    this.preventEvents()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/wizard/index';
</style>
