<template>
  <div>
    <!-- Card container -->
    <ul
      class="card-wrapper">
      <li 
        class="card-container"
        v-for="buyingLead in buying_leads"
        :key="buyingLead.buying_lead_id"
        :ref="`cardContainer-${buyingLead.buying_lead_id}`">
        <!-- Image Preview -->
        <div class="img-container">
          <img :src="getImageUrl(buyingLead.location)">
        </div>

        <!-- Title -->
        <h2 class="title section">{{getTitle(buyingLead.title)}}</h2>

        <!-- Description -->
        <p class="description section"
          @click="onViewButton(buyingLead.domain)">{{getDescription(buyingLead.description)}}</p>

        <!-- How many quotes -->
        <p class="quotes section">{{buyingLead.quote_count}} Quoted</p>

        <!-- Status -->
        <div class="status-container section">
          <div class="status-wrapper">
            <!-- Progress -->
            <div>
              <span 
                :class="['status', `${getStatus(buyingLead.status)}`]">
                {{buyingLead.status}}</span></div>
            <!-- Due date -->
            <div>
              <span 
                class="due-date"
                v-show="buyingLead.status === 'Activated'">{{getDueDateLeft(buyingLead)}}</span></div>
          </div>
        </div>

        <!-- Actions -->
        <div class="action-container section">
          <div 
            class="action-wrapper"
            v-show="buyingLead.status !== 'Archived'">
            <div><span @click="onEditButton(buyingLead.domain)">Edit</span></div>
            <div><span @click="onArchiveButton(buyingLead.buying_lead_id)">Archive</span></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTimeLeft } from '~/utils/timezone'
export default {
  props: ['buying_leads'],
  methods: {
    getTitle(title) {
      return title || 'Title of Your RFQ'
    },
    getDescription(desc) {
      return desc || 'Please fill in description about what you need'
    },
    getStatus(status) {
      return status.toLowerCase()
    },
    getImageUrl(url) {
      return url ? url : require('~/assets/icons/pictures.svg')
    },
    getQuoteCount(buying_lead) {
      const { quote_count } = buying_lead
      return quote_count
    },
    getDueDateLeft(buying_lead) {
      const { due_day_diff, due_hour_diff, due_minute_diff } = buying_lead
      return getTimeLeft(due_minute_diff, due_hour_diff, due_day_diff)
    },
    onViewButton(domain) {
      this.$emit('onViewBuyingLead', domain)
    },
    onEditButton(domain) {
      this.$emit('onEditBuyingLead', domain)
    },
    onArchiveButton(buying_lead_id) {
      // Blur Card
      const $cardContainer = this.$refs[`cardContainer-${buying_lead_id}`][0]
      $cardContainer.classList.add('deleting')

      this.$emit('onArchiveBuyingLead', buying_lead_id)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

@section-padding: 16px;
* {
  margin: 0;
  padding: 0;
}

.card-wrapper {
  border-radius: @border-radius;
  border: 1px solid @color-light-gray;
}
.card-container {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  border-bottom: 1px solid @color-light-gray;
  font-size: 17px;

  &:last-child {
    border-bottom: 1px solid transparent;
  }

  &:hover {
    .action-container {
      visibility: visible;
    }
  }

  &.deleting {
    opacity: 0.4;
  }

  &.disabled {
    background-color: @color-lightest-grey;
    opacity: 0.8;
  }
  .section {
    padding-left: @section-padding;
  }

  .img-container {
    display: inline-flex;
    width: 100px;
    height: 100px;
    overflow: hidden;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 400;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .description {
    font-weight: 400;
    color: @color-font-gray;
    width: 350px;
    max-height: 100px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 라인수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      cursor: pointer;
    }
  }
  .quotes {
    flex: 1;
    text-transform: uppercase;
    font-size: 15px;
  }
  .status-container {
    flex: 1;

    .status-wrapper {
      display: flex;
      flex-direction: column;
    }
  }
  .status {
    font-weight: 500;
    font-size: 15px;

    &.activated {
      color: @color-green;
    }
    &.draft {
      color: @color-yellow;
    }
    &.rejected {
      color: @color-red;
    }
  }

  .due-date {
    font-weight: 500;
    font-size: 15px;
  }

  .action-container {
    flex: 1;
    visibility: hidden;
    font-size: 16px;
    text-align: left;

    .action-wrapper {
      display: flex;
      flex-direction: column;
    }
    span {
      color: @color-link;
      cursor: pointer;
    }
  }
}
</style>
