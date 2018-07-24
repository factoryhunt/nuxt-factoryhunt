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
        title: 'Do you have a paid membership for buyers?',
        description:
          'Currently, all services are completely free for buyers on Factoryhunt.com. Please feel free to sign up as a buyer to discover reliable suppliers and new business opportunities. ',
        img: ''
      },
      {
        title: 'What is paid Supplier Membership on Factoryhunt.com?',
        description:
          'Suppliers with paid membership are provided with comprehensive ways to promote their products and to maximize business exposure to potential buyers.',
        img: ''
      },
      {
        title: 'What is Priority Ranking?',
        description:
          "Company profile with paid membership will have a better chance of appearing at the top of a buyer's search results.",
        img: ''
      },
      {
        title: 'What is Paid Membership Icon?',
        description:
          "Your company profile will get recognized for being an outstanding supplier with Paid Membership icon in buyer's search results.",
        img: ''
      },
      {
        title: 'What is Free Display Marketing?',
        description:
          "Free Display Marketing highlights your products and company profile within both Suggested Suppliers section and in a buyer's search results.",
        img: ''
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
