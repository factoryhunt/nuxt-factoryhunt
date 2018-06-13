<template>
  <nav 
    itemscope>
    <p>Category</p>
    <!-- <input ref="categorySearchInput" type="text" @input="updateCategorySearch()"> -->
    <ul>
      <li>
        <a ref="rootItem" href="/buying-leads">All</a></li>
      <li 
        ref="item"
        v-for="(category, i) in categories"
        :key="i">
        <a 
          :href="getItemHref(category.name)">{{category.name}}</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['categories'],
  methods: {
    highlightItem() {
      const { category } = this.$route.query

      if (!category) this.$refs.rootItem.classList.add('highlight')

      const highlight = () => {
        const $items = this.$refs.item

        $items.forEach($item => {
          const { textContent } = $item

          if (textContent === category) {
            return $item.children[0].classList.add('highlight')
          }
        })
      }

      this.$nextTick(() => {
        highlight()
      })
    },
    getItemHref(name) {
      return `/buying-leads?category=${name}`
    },
    updateCategorySearch() {
      const value = this.$refs.categorySearchInput.value
      this.$emit('input', value)
    }
  },
  watch: {
    categories() {
      this.highlightItem()
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
  // margin-top: @container-margin;
  margin-top: 10px;
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
      background-color: @color-white;
      .gray-border;
    }

    &.highlight {
      color: @color-orange !important;
      background-color: @color-white;
      .gray-border;
    }
  }
}
</style>
