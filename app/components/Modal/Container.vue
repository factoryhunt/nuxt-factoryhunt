<template>
  <transition name="modal">
    <div 
      v-if="!isHidden"
      ref="modalBackground"
      class="modal-background">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['isHidden'],
  methods: {
    init() {
      this.listeningEvents()
    },
    listeningEvents() {
      document.addEventListener('keydown', ({ keyCode }) => {
        if (keyCode === 27) this.$emit('close')
      })
      document.addEventListener('click', ({ target }) => {
        const isModalContainer = target.classList.contains('modal-content')
        if (!this.isHidden && isModalContainer) this.$emit('close')
      })
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    console.log('destroyed modal container')
  },
  watch: {
    isHidden(isHidden) {
      console.log('isHidden changed', isHidden)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
.modal-background {
  display: block !important;
  transition: opacity 0.3s ease;
}
.modal-content {
  // padding: 0 20px;
  padding: 0;
  transition: all 0.3s ease;

  @media (min-width: 744px) {
    padding: 0;
  }
}

// Transtition
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-content,
.modal-leave-active .modal-content {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
