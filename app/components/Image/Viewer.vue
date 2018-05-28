<template>
  <div 
    class="image">
    <div class="image__container">
      <img :src="url">
    </div>
    <div class="action__container">
      <div class="button-container">
        <img 
          class="button cancle__button" 
          src="~assets/icons/cancel.svg"
          @click="onDeleteButton">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: null
    },
    url: {
      type: String,
      default: ''
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
  data: () => ({
    isMounted: false
  }),
  methods: {
    initImageViewer() {},
    onDeleteButton() {
      this.$emit('delete')
    }
  },
  mounted() {
    this.initImageViewer()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

.deleting {
  opacity: 0.4;
}

.image {
  display: inline-flex;
  justify-content: center;
  position: relative;
  box-shadow: 0 2px 4px @color-light-gray;
  border-radius: @border-radius;
  overflow: hidden;
  background-color: @color-white;

  &:hover {
    .action__container {
      display: inline-block;
    }
  }
}

.image__container {
  display: flex;
  position: relative;

  img {
    width: 100%;
    object-fit: contain;
  }
}

.action__container {
  position: absolute;
  display: none;
  top: 6px;
  right: 6px;
  z-index: 2;

  .button-container {
    width: 24px;
    height: 24px;
    overflow: hidden;
    box-shadow: 0 2px 4px @color-light-gray;
    border-radius: 50%;
    background-color: @color-white;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 2px 8px @color-light-gray;
    }
  }
  .button {
    width: 100%;
    padding: 6px;
  }
}
</style>
