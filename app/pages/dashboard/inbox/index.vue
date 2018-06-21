<template>
  <div class="dashboard-page-container">

    <!-- Header -->
    <div class="header-container">
      <h1 class="title">{{ $t('dashboardInbox.header.title') }}</h1>
    </div>

    <!-- Body -->
    <div class="product-container">

      <!-- message empty -->
      <div 
        v-if="!inbox.length"
        class="product-empty-container">
        <div class="empty">
          <p class="title">No messages yet.</p>
          <p class="sub-title">When you start conversations with<br> potential business partners, read messages here.</p>
        </div>
      </div>

      <!-- messages exist -->
      <div 
        class="product-list-container"
        v-else>
        <div class="list-container">
          <div 
            v-for="(message, index) in inbox" 
            :key="index"
            :id="`list-${index}`" 
            class="list">
            <circle-img 
              class="logo"
              :url="getLogoUrl(message)"/>
            <div class="category-container">
              <p class="primary-text" v-show="getUserName(message)">{{getUserName(message)}}</p>
              <p class="secondary-text">{{getUserTitle(message)}}</p>
            </div>
            <div class="product-name-container">
              <p 
                class="name-text" 
                @click="routeChatRoom(index)">{{message.body}}</p>
            </div>
            <div class="date-container">
              <p>{{getCreatedDate(message)}}</p>
            </div>
            <div class="tool-container">
              <a 
                class="message-star-button" 
                @click="showProductRemoveModal(index)">{{ $t('dashboardProduct.exist.delete') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircleImg from '~/components/Image/CircleViewer'
import { getCreatedDateDiff } from '~/utils/timezone'
export default {
  head: () => ({
    title: 'Messages'
  }),
  components: {
    CircleImg
  },
  props: {
    account: {
      type: Object,
      default: () => {
        return {}
      }
    },
    contact: {
      type: Object,
      default: () => {
        return {}
      }
    },
    inbox: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      value: {
        productIndex: null,
        filter: ''
      }
    }
  },
  methods: {
    getUserName(message) {
      const { first_name, last_name } = message

      if (first_name && last_name) return `${first_name} ${last_name}`

      if (first_name) return first_name
      if (last_name) return last_name

      return ''
    },
    getLogoUrl(message) {
      const { logo_url } = message

      return logo_url ? logo_url : require('~/assets/icons/user.svg')
    },
    getUserTitle(message) {
      const { account_name } = message
      return account_name
    },
    getCreatedDate(message) {
      const payload = {
        year_diff: message.year_diff,
        month_diff: message.month_diff,
        week_diff: message.week_diff,
        day_diff: message.day_diff,
        hour_diff: message.hour_diff,
        minute_diff: message.minute_diff,
        second_diff: message.second_diff
      }
      const result = getCreatedDateDiff(payload)

      return result
    },
    routeChatRoom(index) {
      const url = `/dashboard/inbox/${this.inbox[index].conversation_id}`
      location.href = url
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

@list-height: 60px;

//Global
p {
  margin: 0;
}
button {
  font-size: 17px;
}

.list-divider {
  height: 1px;
  background-color: @color-light-grey;
}

.dashboard-page-container {
  padding-bottom: 30px;
  // Header
  .header-container {
    .title {
      font-size: 30px;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 40px;
    }
  }

  // Message Filter
  .space-1 {
    margin-bottom: 6px;

    .message-filter-container {
      position: relative;
      display: inline-block;
      vertical-align: bottom;

      .each-button {
        vertical-align: middle;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 2em;
      }
      #messages {
        font-size: 16px;
        background-position-x: 93%;
      }
    }
  }

  // Products
  .product-container {
    border: 1px solid @color-light-grey;
    border-radius: @border-radius;

    .product-empty-container {
      padding: 80px 12px;

      .empty {
        text-align: center;
        .title {
          font-weight: 500;
          font-size: 24px;
        }
        .sub-title {
          margin-top: 8px;
          font-weight: 300;
          font-size: 18px;
          margin-bottom: 28px;
        }
        .product-upload-button {
          font-weight: 600;
          font-size: 19px;
        }
      }
    }

    .product-list-container {
      padding: 0 22px;

      .list-container {
        width: 100%;

        .list {
          display: table;
          table-layout: fixed;
          width: 100%;
          padding: 22px 0;
          border-bottom: 1px solid @color-light-grey;

          &:last-child {
            border-bottom: 0;
          }

          &:hover {
            .tool-container {
              // visibility: visible;
            }
          }

          // 9%
          .logo {
            width: 60px !important;
            height: 60px !important;
          }

          // 18%
          .category-container {
            vertical-align: middle;
            display: table-cell;
            width: 18%;
            padding: 0 8px;

            .primary-text {
              font-size: 15px;
              font-weight: 500;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* 라인수 */
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .secondary-text {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              font-size: 15px;
              font-weight: 400;
              color: @color-font-gray;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* 라인수 */
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          // 53%
          .product-name-container {
            vertical-align: middle;
            text-align: left;
            display: table-cell;
            padding: 0 8px;
            width: 53%;

            .name-text {
              cursor: pointer;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 17px;
              font-weight: 400;
            }
            .code-text {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: 300;
            }
          }

          // 10%
          .date-container {
            width: 12%;
            display: table-cell;
            vertical-align: middle;
            text-align: left;
            padding: 0 8px;

            p {
              white-space: nowrap;
              font-size: 15px;
              font-weight: 400;
              color: @color-font-gray;
            }
          }

          // 10%
          .tool-container {
            width: 8%;
            vertical-align: middle;
            text-align: center;
            display: table-cell;
            visibility: hidden;
            /*text-align: center;*/

            a {
              font-size: 15px;
              font-weight: 300;
              float: none;
            }
            span {
              font-size: 13px;
              color: @color-link;
            }

            .message-star-button {
            }
            .message-archieve-button {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
