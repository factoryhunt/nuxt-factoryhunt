<template>
  <div v-show="!isHidden">
    <span class="counting">{{getRemainLength}}</span>
  </div>
</template>

<script>
import { getRemainInputLength } from '~/utils/text'
export default {
  props: {
    value: {
      type: null,
      default: ''
    },
    maxlength: {
      type: [String, Number]
    },
    isHidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getRemainLength() {
      return getRemainInputLength(this.value, this.maxlength)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '../style/index';

.counting {
  position: absolute;
  top: -21px;
  right: 0;
  font-size: 14px;
  font-weight: 500;
  color: @color-font-gray;
}
</style>
