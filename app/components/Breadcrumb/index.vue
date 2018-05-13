<template>
  <nav itemscope>
    <ul>
      <li><a href="#">{{root}}</a></li>
      <li><a href="#">> step1</a></li>
      <li><a href="#">> step2</a></li>
      <li><a href="#">> step3</a></li>
      <li><a href="#">> step4</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    root: {
      type: String,
      default: 'Breadcrumb'
    },
    branches: Array
  },
  methods: {},
  mounted() {
    // console.log('branches', this.branches)
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
[itemscope] {
  margin: 30px 0;
  text-transform: uppercase;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  font-weight: 400;
}
li {
  display: inline-block;
  margin-left: 6px;

  &:first-child {
    margin-left: 0 !important;
  }
}
</style>
