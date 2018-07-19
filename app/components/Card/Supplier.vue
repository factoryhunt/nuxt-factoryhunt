<template>
  <div class="wrapper">
    <h2>Wholesalers in {{suppliers[0].mailing_country}}</h2>
    <div class="cards">
      <div 
        class="card"
        v-for="(supplier,index) in suppliers"
        :key="supplier.account_name"
        v-if="index < 6">
        <a :href="supplier.domain" target="_blank">
          <img class="img" :src="supplier.cover_image_url_1">
          <div class="products-wrapper">
            <span 
              class="verified" 
              v-show="supplier.membership_left_time">Featured</span>
            <span
              class="products">{{supplier.products}}</span>
          </div>
          <div class="company">{{supplier.account_name}}</div>
          <div class="total" v-show="supplier.total_product_length">{{getTotalProducts(supplier)}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['suppliers'],
  methods: {
    getTotalProducts({ total_product_length }) {
      return total_product_length < 2
        ? `Total ${total_product_length} product`
        : `Total ${total_product_length} products`
    }
  }
}
</script>


<style lang="less" scoped>
@import '~assets/css/index';
* {
  margin: 0;
  padding: 0;
}
.cards {
  @gap: 24px;
  overflow: scroll;
  display: grid;
  margin-top: 22px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: @gap;
  grid-row-gap: @gap;
}

h2 {
  font-size: 18px;

  @media (min-width: 744px) {
    font-size: 26px;
  }
}

.card {
  width: 100%;

  a {
    text-decoration: none;
  }

  .img {
    border-radius: @border-radius;
    width: 100%;
    height: 160px;
    object-fit: cover;
    box-shadow: 0 1px 1px 1px @color-border-gray;

    @media (min-width: 744px) {
      height: 200px;
    }
  }
  .products-wrapper {
    margin-top: 6px;
    display: block;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    color: @color-link;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 240px;
  }
  .verified {
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    padding: 4px;
    border: 1px solid @color-link;
    border-radius: @border-radius;
    background-color: @color-link;
    color: @color-white;
  }
  .products {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .company {
    margin-top: 4px;
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    color: @color-font-black;
  }
  .total {
    margin-top: 5px;
    font-size: 14px;
    color: @color-font-gray;
  }
}
</style>
