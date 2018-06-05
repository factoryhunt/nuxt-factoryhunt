<template>
  <modal 
    v-if="!isHidden"
    @close="$emit('close')">
    <div 
      class="container">
      <!-- Header -->
      <div class="header">
        <img 
          class="hide-button"
          src="~assets/icons/cancel.svg" 
          alt="Hide button"
          @click="$emit('close')">
      </div>
      <!-- Image Viewer -->
      <transition name="fade">
        <main>
          <div 
            class="angle-container left"
            @click="showPrevImage">
            <img 
              class="angle" 
              src="~assets/icons/arrow-angle-left-white.png">
          </div>
          <div class="image-container">
            <img 
              class="image"
              :src="currentImage.location">
          </div>
          <div 
            class="angle-container right"
            @click="showNextImage">
            <img 
              class="angle"
              src="~assets/icons/arrow-angle-right-white.png">
          </div>
        </main>
      </transition>
    </div>
  </modal>
</template>

<script>
import Modal from '~/components/Modal/Container'
export default {
  components: {
    Modal
  },
  props: ['files', 'index', 'isHidden'],
  data: () => ({
    currentImage: '',
    currentIndex: 0
  }),
  computed: {
    isFileEmpty() {
      return this.files.length === 0
    },
    getLength() {
      return this.files.length
    },
    isFirstImage() {
      return this.currentIndex === 0
    },
    isLastImage() {
      return this.currentIndex === this.getLength - 1
    }
  },
  methods: {
    init() {
      this.addEventListener()
    },
    addEventListener() {
      document.addEventListener('keydown', event => {
        if (this.isHidden) return

        const { keyCode } = event

        if (keyCode === 37) this.showPrevImage()
        if (keyCode === 39) this.showNextImage()
      })
    },
    renderImage() {
      this.currentImage = this.files[this.currentIndex]
    },
    showPrevImage() {
      if (this.isFileEmpty) return

      if (this.isFirstImage) this.currentIndex = this.getLength - 1
      else this.currentIndex--

      this.renderImage()
    },
    showNextImage() {
      if (this.isFileEmpty) return

      if (this.isLastImage) this.currentIndex = 0
      else this.currentIndex++

      this.renderImage()
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    index(index) {
      if (this.isFileEmpty) return

      this.currentIndex = index
      this.currentImage = this.files[this.currentIndex]
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@height: 87px;

.modal-background {
  display: block;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.header {
  // background-color: @color-green;
  padding: 10px 20px;
  text-align: right;
  // height: 86px;
}
.hide-button {
  position: relative;
  background-color: @color-white;
  padding: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
}

main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;

  .image-container {
    position: relative;
    width: 100%;
    height: 80vh;
    flex: 1;
  }
  .image {
    // max-width: 105vh;
    // flex: 1;
    // width: 100%;
    object-fit: contain;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .angle-container {
    display: none;
    position: relative;

    &:hover {
      cursor: pointer;
    }

    @media (min-width: 744px) {
      display: block;
    }
  }
  .angle {
    width: 60px !important;
  }
}
</style>
