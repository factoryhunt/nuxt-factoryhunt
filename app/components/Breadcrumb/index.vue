<template>
  <nav itemscope>
    <ul>
      <li 
        v-for="(value,index) in payload"
        :key="value.value">
        <i 
          class="fa fa-angle-right angle" 
          aria-hidden="true"
          v-show="index"></i>
        <a 
          :href="value.uri">
          {{value.value}}</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    payload: null
  },
  methods: {
    getBreadcrumb() {}
  },
  watch: {
    payload(data) {}
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
[itemscope] {
  margin: 18px 0;
  text-transform: uppercase;

  @media (min-width: 744px) {
    margin: 30px 0;
  }
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 12px;
  font-weight: 400;

  @media (min-width: 744px) {
    font-size: 13px;
  }
}
li {
  display: inline-block;

  &:first-child {
    margin-left: 0 !important;
  }
}
.angle {
  margin-left: 6px;
  margin-right: 2px;
  padding: 0;
  color: @color-font-black;
}
</style>
