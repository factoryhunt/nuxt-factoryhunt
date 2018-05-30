<template>
  <div 
    v-show="!isHidden"
    ref="modalBackground"
    class="modal-background">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
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
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
.modal-background {
  display: block;
}
</style>
