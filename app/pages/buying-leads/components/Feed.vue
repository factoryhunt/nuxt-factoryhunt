<template>
  <main id="feed-container">
    <ul class="feed__leads">
      <li 
        v-for="(feed, index) in feeds"
        :key="index">
        <a 
          class="feed-wrapper" 
          :href="getFeedHref(feed)">
          <!-- Image -->
          <div class="img-container">
            <img 
              :src="getImageLink(feed)">
          </div>
          <!-- Quotes -->
          <div class="content-container">
            <section class="header">
              <!-- Title -->
              <h2 class="title">{{feed.title}}</h2>
              <!-- Date -->
              <div class="date">{{getDueDateLeft(feed)}}</div>
            </section>
            <!-- Desc -->
            <p class="desc">{{feed.description}}</p>
            <!-- Bottom -->
            <section class="bottom">
              <div class="verification">
                <ul class="verification__container">
                  <!-- Country -->
                  <li class="verification__mark">
                    <tool-tip
                      v-show="getCountry(feed)"
                      :label="getCountry(feed)">This buyer posted in {{getCountry(feed)}}</tool-tip></li>
                  <!-- Quantity -->
                  <li class="verification__mark">
                    <tool-tip
                      v-show="getQuantity(feed)"
                      :label="getQuantity(feed)">Buyer wants {{getQuantity(feed)}}quantities.</tool-tip></li>
                  <!-- Email Verification -->
                  <li 
                    class="verification__mark"
                    v-show="false">
                    <tool-tip
                      label="Email">This buyer emails is confirmed.</tool-tip></li>
                  <!-- Active Buyer -->
                  <li 
                    class="verification__mark"
                    v-show="false">
                    <tool-tip
                      label="Active Buyer">This buyer has sent inquiries or posted Buying Requests frequently within the last 90 days.</tool-tip></li>
                </ul>
              </div>
              <div 
                class="quotes"
                :class="{'no-quote': isNoQuote(feed)}">{{feed.quote_length}} Quoted</div>
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
import { getTimeLeft } from '~/utils/timezone'
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
      return `/buying-leads/${feed.domain}`
    },
    getImageLink(feed) {
      const { location } = feed

      return location ? location : require('~/assets/icons/pictures.svg')
    },
    getQuantity(feed) {
      const { quantity, unit } = feed

      const exist = quantity && unit
      const result = exist ? `${quantity} ${unit}` : ''

      return result
    },
    getDueDateLeft(feed) {
      const { due_day_diff, due_hour_diff, due_minute_diff } = feed
      return getTimeLeft(due_minute_diff, due_hour_diff, due_day_diff)
    },
    getCountry(feed) {
      return feed.mailing_country
    },
    isNoQuote(feed) {
      return feed.quote_length === 0
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
  width: 100%;
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
    width: 50px;
    height: 50px;
    border-radius: @border-radius;
    border: 1px solid @color-border-gray;

    @media (min-width: 744px) {
      width: 80px;
      height: 80px;
    }
  }
  img {
    width: 100%;
    object-fit: cover;
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
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 500;

      @media (min-width: 744px) {
        font-size: 12px;
      }
    }

    .desc {
      margin-top: 9px;
      font-size: 13px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: @color-font-gray;
      max-height: 32px;

      @media (min-width: 744px) {
        font-size: 16px;
        max-height: 40px;
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
    .no-quote {
      font-weight: 500;
    }
  }
}
</style>
