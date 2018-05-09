<template>
  <main id="feed-container">
    <ul class="feed__leads">
      <li 
        v-for="(feed, index) in feeds"
        :key="index">
        <a 
          class="feed-wrapper" 
          href="/buying-leads">
          <!-- Image -->
          <div class="img-container">
            <img src="https://zdnet2.cbsistatic.com/hub/i/r/2017/07/18/071068d1-e257-4abf-811d-48a626f621f7/resize/770xauto/72e298cc964f48604e0edb0a3ee72339/bear.jpg">
          </div>
          <!-- Quotes -->
          <div class="content-container">
            <section class="header">
              <!-- Title -->
              <h2 class="title">{{feed.company.bs}}</h2>
              <!-- Date -->
              <div class="date">
                1 Hours Ago
              </div>
            </section>
            <!-- Desc -->
            <p class="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, accusamus nulla consequatur unde, sapiente facilis alias.</p>
            <!-- Country -->
            <!-- <div class="country">Buyer from South Korea 🇰🇷 </div> -->
            <!-- Bottom -->
            <section class="bottom">
              <div class="verification">
                <ul class="verification__container">
                  <li class="verification__mark">
                    <tool-tip
                      label="South Korea"
                      tip="This buyer posted in South Korea"/></li>
                  <li class="verification__mark">
                    <tool-tip
                      label="1K Pieces"
                      tip="Buyer wants 1K Pieces quantities."/></li>
                  <li class="verification__mark">
                    <tool-tip
                      label="Email"
                      tip="This buyer emails is confirmed."/></li>
                  <li class="verification__mark">
                    <tool-tip
                      label="Active Buyer"
                      tip="This is test tool-tip box! This is test tool-tip box! This is test tool-tip box! This is test tool-tip box!"/></li>
                </ul>
              </div>
              <div class="quotes">
                3 Quoted
              </div>
            </section>
          </div>
        </a>
      </li>
    </ul>
  </main>
</template>

<script>
import axios from '~/plugins/axios'
import ToolTip from '~/components/ToolTip'
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    feeds: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ToolTip
  },
  methods: {
    getFeedHref(feed) {
      return `/buying-leads/${feed.id}`
    }
  }
}
</script>


<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/buying_leads/index';

@margin-left: 6px;

#feed-container {
  flex: 1 !important;
}
ul {
  list-style: none;
}

.card {
  padding: @section-padding;
  background-color: @color-white;
  .gray-border;
}

// Buying Leads Feed Lists
.feed__leads {
  .gray-border;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .feed-wrapper {
    display: flex;
    padding: @section-padding;
    border-bottom: 1px solid @color-border-gray !important;
    background-color: @color-white;
    color: @color-font-black;
    text-decoration: none;

    &:hover {
      background-color: @color-bg-gray;
      cursor: pointer;
    }
  }
  .img-container {
    position: relative;
    display: inline-flex;
    width: 80px;
    height: 80px;
    border-radius: @border-radius;
  }
  img {
    width: 100%;
    object-fit: contain;
    border-radius: @border-radius;
  }
  .content-container {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    flex: 1;

    section {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: @color-font-gray;

      @media (min-width: 744px) {
        font-size: 14px;
      }
    }

    .title {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @media (min-width: 744px) {
        font-size: 19px;
      }
    }
    .date {
      margin-left: @margin-left;
      font-size: 9px;
      text-transform: uppercase;
      font-weight: 500;

      @media (min-width: 744px) {
        font-size: 12px;
      }
    }

    .desc {
      margin-top: 9px;
      font-size: 13px;
      color: @color-font-gray;

      @media (min-width: 744px) {
        font-size: 16px;
      }
    }

    .bottom {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin-top: 20px;
    }
    .verification {
      flex: 1;
    }
    .verification__mark {
      display: inline-flex;
      border: 1px solid @color-border-gray;
      border-radius: @border-radius;
      background-color: @color-bg-gray;
      font-size: 9px;
      color: @color-font-gray;
      margin-right: 8px;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      @media (min-width: 744px) {
        font-size: 11px;
      }
    }
    .quotes {
      color: @color-link;
      font-weight: 600;
      margin-left: @margin-left;
      text-transform: uppercase;
    }
  }
}
</style>
