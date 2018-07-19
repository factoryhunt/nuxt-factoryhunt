<template>
  <div class="wrapper">
    <h2>FAQs</h2>

    <div class="card-container">
      <card 
        class="card"
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :img="card.img"
        :description="card.description"/>
    </div>
  </div>
</template>

<script>
import Card from './Card'
export default {
  components: {
    Card
  },
  data: _ => ({
    cards: [
      {
        title: 'What is paid Supplier Membership on Factoryhunt.com?',
        description:
          'Suppliers with paid membership are provided with comprehensive ways to promote their products and to maximize business exposure to potential buyers.'
      },
      {
        title: 'What is priority ranking and verified icon?',
        description:
          'Your company is exposed on top of our search results. We would like to give a difference between free user and membership user on the search result page.',
        img: 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/img/pricing/pricing-faqs-1.png'
      },
      {
        title: 'How can I access to buyer information?',
        description:
          "It is worked on buying lead page. You can see the buyer's information when your quote is not accepted yet. You don't need to leave your time to get the details of buyer.",
        img: 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/img/pricing/pricing-faqs-2.png'
      },
      {
        title: 'Do you have a paid membership for buyers?',
        description:
          'Currently, all services are completely free for buyers on Factoryhunt.com. Please feel free to sign up to reach and find out reliable suppliers for your business. '
      }
    ]
  })
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
* {
  margin: 0;
  padding: 0;
}

.wrapper {
  margin-top: 100px;
  margin-bottom: 60px;
}
.card-container {
  margin-top: 30px;
}
.card {
  margin-top: 50px;

  &:first-child {
    margin-top: 0;
  }

  @media (min-width: 1128px) {
    max-width: 700px;
  }
}
</style>
