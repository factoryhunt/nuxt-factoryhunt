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

        <!-- Author -->
        <div class="author section">
          by {{buyingLead.account_name}}
        </div>

        <!-- Content -->
        <div 
          class="content section"
          @click="onViewButton(buyingLead.domain)">
          <!-- Title -->
          <h2 class="title">{{getTitle(buyingLead.title)}}</h2>

          <!-- Description -->
          <p class="description">{{getDescription(buyingLead.description)}}</p>
        </div>

        <!-- How many quotes -->
        <p class="quotes section">{{buyingLead.quote_count}} Quotes</p>

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
            v-show="!isActionBarHidden(buyingLead)">
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
import { mapGetters } from 'vuex'
export default {
  props: ['buying_leads'],
  computed: {
    ...mapGetters({
      account: 'auth/GET_ACCOUNT'
    }),
    getAccountId() {
      return this.account.account_id
    }
  },
  methods: {
    getTitle(title) {
      return title || 'Title of Your Request Quote'
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
    isActionBarHidden(buyingLead) {
      const { account_id, status } = buyingLead

      if (status === 'Archived') return true

      if (account_id !== this.getAccountId) return true
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

  .author {
    width: 180px;
  }

  .content {
    width: 350px;

    &:hover {
      cursor: pointer;
    }
  }
  .title {
    text-align: left;
    font-size: 18px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .description {
    text-align: left;
    color: @color-font-gray;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
