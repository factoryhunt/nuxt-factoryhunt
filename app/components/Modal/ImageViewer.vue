<template>
  <modal 
    v-if="!isHidden"
    @close="$emit('close')">
    <div class="main">
      <div>
        <img class="cancel" src="~assets/icons/cancel.svg">
      </div>
      <div class="viewer">
        Image Viewer
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '~/components/Modal/Container'
export default {
  components: {
    Modal
  },
  props: ['files', 'isHidden']
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
.modal-background {
  display: block;
}

.main {
  position: relative;
  width: 100%;
  height: 100%;
}
.cancel {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
}
.viewer {
  display: grid;
  background-color: @color-white;
  margin: 0 auto;
  max-width: 800px;
}
</style>
