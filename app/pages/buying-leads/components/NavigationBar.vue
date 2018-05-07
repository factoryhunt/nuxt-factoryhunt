<template>
  <nav 
    itemscope>
    <p>Category</p>
    <input ref="categorySearchInput" type="text" @input="updateCategorySearch()">
    <ul>
      <li 
        v-for="(category, i) in categories"
        :key="i">
        <a :href="getItemHref(category.name)">{{category.name}}</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['categories'],
  models: ['search'],
  methods: {
    getItemHref(name) {
      return `/buying-leads/${name}`
    },
    updateCategorySearch() {
      const value = this.$refs.categorySearchInput.value
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/buying_leads/index';
nav {
  position: relative;
  width: 200px !important;
  margin-right: @container-margin;
  margin-bottom: @container-margin;
}
p {
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px 34px 8px 11px !important;
  font-size: 17px;
  margin-top: 8px;
  background: url(~assets/icons/magnifying-glass.svg);
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: 94% 50%;
}

ul {
  list-style: none;
  margin-top: @container-margin;
}
li {
  background-color: @color-white;

  a {
    display: block;
    padding: 7px;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: @color-font-black;
    text-decoration: none !important;

    &:hover {
      color: @color-orange;
    }
  }
}
</style>
