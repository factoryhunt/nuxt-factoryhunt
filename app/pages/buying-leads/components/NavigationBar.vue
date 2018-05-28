<template>
  <nav 
    itemscope>
    <p>Category</p>
    <input ref="categorySearchInput" type="text" @input="updateCategorySearch()">
    <ul>
      <li>
        <a href="/buying-leads">All</a></li>
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
  methods: {
    getItemHref(name) {
      return `/buying-leads?category=${name}`
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
@font-size: 16px;

nav {
  display: none;
  position: relative;
  width: 210px !important;
  margin-right: @container-margin;
  margin-bottom: @container-margin;

  @media (min-width: 744px) {
    display: block;
  }
}
p {
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px 34px 8px 11px !important;
  font-size: @font-size;
  margin-top: 8px;
  background-color: @color-white !important;
  background: url(~assets/icons/magnifying-glass.svg);
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: 94% 50%;
  .gray-border;
}

ul {
  list-style: none;
  margin-top: @container-margin;
}
li {
  a {
    display: block;
    padding: 7px 11px;
    width: 100%;
    height: 100%;
    font-size: @font-size;
    color: @color-font-black !important;
    border: 1px solid transparent;
    border-radius: @border-radius;
    text-decoration: none !important;

    &:hover {
      color: @color-orange !important;
      .gray-border;
    }
  }
}
</style>
