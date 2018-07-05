<template>
  <section>
    <h1 class="title">Choose your Supplier Membership</h1>

    <div class="pricing-table-container">

      <!-- Starter -->
      <section class="pricing-table">
        <h2 class="table-title">Starter</h2>
        <p class="table-pricing">$0</p>
        <p>Connect your business and showcase your products to the worldwide community of buyers on Factory Hunt.</p>
        <ul>
          <li>Priority Ranking (3rd)</li>
          <li>Modern Company Webpage</li>
          <li>Online Product Catalog</li>
          <li>Product Posting (Limited)</li>
          <li>Submit Quotes for Buying Leads(Limited)</li>
        </ul>
        <div class="footer-button-container">
          <a href="/for-supplier" class="table-button">{{ $t('pricing.select') }}</a>
        </div>
      </section>

      <!-- Standard -->
      <section class="pricing-table">
        <h2 class="table-title">Standard</h2>
        <p class="table-pricing">$50 / month</p>
        <p>$500 / year</p>
        <p>Maximize your exposure with Factory Hunt premium supplier membership.</p>
        <ul>
          <li>Priority Ranking (2nd)</li>
          <li>Modern Company Webpage</li>
          <li>Online Product Catalog</li>
          <li>Product Posting (Unlimited)</li>
          <li>Submit Quotes for Buying Leads(Unlimited)</li>
          <li>Access to Buyer Information</li>
          <li>Verified Icon</li>
          <li>Free Display Marketing</li>
          <li>Personalized Customer Service</li>
        </ul>
        <div class="footer-button-container">
          <a class="table-button">{{ $t('pricing.select') }}</a>
        </div>
      </section>

      <!-- Enterprise -->
      <section class="pricing-table">
        <h2 class="table-title">Enterprise</h2>
        <p class="table-pricing"> Coming Soon </p>
        <p>Please tell us what you need.</p>
        <ul>
          <li>Priority Ranking (1st)</li>
          <li>Modern Company Webpage</li>
          <li>Online Product Catalog</li>
          <li>Product Posting (Unlimited)</li>
          <li>Submit Quotes for Buying Leads(Unlimited)</li>
          <li>Access to Buyer Information</li>
          <li>Verified Icon</li>
          <li>Free Display Marketing</li>
          <li>Personalized Customer Service</li>
        </ul>
        <div class="footer-button-container">
          <a class="table-button">{{ $t('pricing.contact') }}</a>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('pricing.title'),
      link: [{ hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/pricing` }]
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
.sub-title {
  margin: 0;
}
.title {
  margin: 40px 20px 15px 20px;
}
.pricing-table-container {
  padding: 30px 0;
  display: flex;
  justify-content: space-around;

  .pricing-table {
    position: relative;
    padding: 18px;
    width: 30%;
    min-height: 500px;
    border: 1px solid #fff;
    border-radius: @border-radius;
    transition: background-color 0.3s;
    box-shadow: @box-shadow;

    .table-title {
      font-size: 25px;
      font-weight: @font-weight-bold;
      margin-top: 5px;
      padding-bottom: 14px;
      border-bottom: @border-light-grey;
      text-align: center;
    }

    .table-pricing {
      text-align: center;
      font-size: @font-size-large;
    }

    ul {
      li {
        font-size: @font-size-medium;
        font-weight: @font-weight-thin;
        padding: 4px 0;
        list-style: none;
      }
      li:before {
        content: '\f00c';
        font-family: 'FontAwesome';
        float: left;
        margin-left: -1.5em;
        color: #0074d9;
      }
    }

    .footer-button-container {
      position: absolute;
      text-align: center;
      width: 100%;
      bottom: 0;
      left: 0;
      padding: 20px 20px 40px 20px;

      .table-button {
        padding: 12px 28px;
        border-radius: @border-radius;
        background-color: @color-orange;
        color: @color-white;
        font-size: 17px;
        font-weight: @font-weight-medium;
        text-decoration: none;

        &:hover {
          background-color: @color-dark-orange;
        }
      }
    }
  }
}
</style>
