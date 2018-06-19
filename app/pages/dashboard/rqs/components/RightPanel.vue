<template>
  <div 
    id="right-panel"
    ref="rightPanel">
    <div class="panel">
      <div 
        class="panel-wrapper"
        ref="panelWrapper">
        <!-- Progress -->
        <div class="containers progress-container">
          <h3 class="panel__title">Completeness</h3>
          <div class="sections progress-wrapper">
            <progress-circle
              id="progress"
              :progress="progress"
              :size="80"/>
            <div class="info">
              {{getProgressMsg}}
            </div>
          </div>
        </div>

        <!-- Image Preview -->
        <div 
          class="containers preview-container" 
          v-if="files.length">
          <!-- Title -->
          <h3 class="panel__title">Preview</h3>
          <!-- Big Size Viewer -->
          <div 
            class="sections preview-wrapper">
            <image-viewer 
              class="viewer"
              :url="files[0].url"
              @delete="onDeleteButton(0)"/>
              <!-- Loading Bar -->
            <div class="file-progress" :style="getProgressWidth"></div>
          </div>
          <!-- Small Size Viewer -->
          <div class="sections small-preview-wrapper">
            <image-viewer
              class="viewer"
              v-for="(file,index) in files"
              :key="index"
              :url="file.url"
              v-if="index > 0"
              @delete="onDeleteButton(index)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// components
import ImageViewer from '~/components/Image/Viewer'
import ProgressCircle from '~/components/Progress/Circle'
export default {
  components: {
    ImageViewer,
    ProgressCircle
  },
  props: {
    files: {
      type: Array,
      default: () => []
    },
    progress: {
      type: Number,
      default: 0
    },
    fileProgress: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getProgressMsg() {
      let msg = ''
      let defaultMsg = 'The more specific your information, the more response from suppliers.'

      if (this.progress < 30) msg = defaultMsg
      if (this.progress >= 50 && this.progress < 80) msg = `Great! ${defaultMsg}`
      if (this.progress >= 80 && this.progress <= 100) msg = `Perfect! ${defaultMsg}`

      return msg
    },
    getProgressWidth() {
      let style = {
        width: `${this.fileProgress}%`,
        opacity: this.fileProgress === 100 ? 0 : 1
      }
      return style
    }
  },
  methods: {
    activateFixed() {
      window.addEventListener('scroll', this.handleScroll)
    },
    handleScroll(event) {
      const $rightPanel = this.$refs.rightPanel
      const { y } = $rightPanel.getBoundingClientRect()
      this.activateStickyPanel(y)
    },
    activateStickyPanel(yDiffWithScreenTop) {
      const $wrapper = this.$refs.panelWrapper
      const diff = 20

      if (yDiffWithScreenTop <= diff) {
        $wrapper.style.position = 'fixed'
        $wrapper.style.top = `${diff}px`
      } else {
        $wrapper.style.position = 'unset'
        $wrapper.style.top = 'initial'
      }
    },
    getImageViewerClass(index) {
      return index === 0 ? 'big' : 'small'
    },
    onDeleteButton(index) {
      this.$emit('imageDelete', index)
    }
  },
  mounted() {
    this.activateFixed()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/rfq/index';

@panelWidthPad: 200px;
@panelWidthDesktop: 370px;
@sectionMargin: 14px;

#right-panel {
  position: relative;
  display: none;
  margin-left: 40px;
  @media (min-width: 744px) {
    display: block;
    width: panelWidthPad;
  }
  @media (min-width: 1128px) {
    width: @panelWidthDesktop;
  }
}
.panel {
  width: 100%;
  position: relative;
}
.panel-wrapper {
  @media (min-width: 744px) {
    width: panelWidthPad;
  }
  @media (min-width: 1128px) {
    width: @panelWidthDesktop;
  }
}
.panel__title {
  font-size: 15px;
  color: @color-font-gray;
  text-transform: uppercase;
}
.containers {
  margin-top: 32px;

  &:first-child {
    margin-top: 0;
  }
}
.sections {
  margin-top: @sectionMargin;
  position: relative;
}

.progress-container {
  .progress-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .info {
    font-size: 16px;
    margin-left: 20px;
  }
}

.preview-container {
  .preview-wrapper {
    display: flex;

    .viewer {
      width: 100%;
      height: 222px;
    }
  }
  .file-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 1%;
    max-width: 100% !important;
    height: 3px !important;
    background-color: @color-orange;
    transition: width 2s, opacity 2s;
  }

  .small-preview-wrapper {
    display: flex;
    flex-direction: row;

    .viewer {
      width: 80px;
      height: 80px;
      margin-right: 12px;
    }
  }
}
</style>
