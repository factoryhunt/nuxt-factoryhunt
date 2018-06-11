<template>
  <div id="caption-container">
    <p><required-icon/> is required field.</p>
  </div>
</template>

<script>
import RequiredIcon from '~/components/Icons/Required'
export default {
  components: {
    RequiredIcon
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/less/colors';
#caption-container {
  font-size: 14px;
  color: @color-font-gray;
  border-top: 1px solid @color-lightest-grey;
  margin-top: 50px;
  padding-top: 8px;
}
</style>
