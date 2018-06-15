<template>
  <div>
    <div class="card-container">
      <div class="card-wrapper">
        <!-- Header -->
        <section 
          class="header"
          v-if="data">
          <!-- User Profile -->
          <div class="header__profile">
            <div class="user-img-container">
              <a href="/user">
                <img :src="getLogoUrl">
              </a>
            </div>
            <div class="identity-container">
              <slot name="name"></slot>
            </div>
          </div>
          <!-- History -->
          <div 
            class="header__history" 
            v-show="topDateDiff">
            <span>{{topDateDiff}}</span>
          </div>
        </section>

        <!-- Content -->
        <slot></slot>

        <!-- Main -->
        <main v-if="data">
          <slot name="main"></slot>
        </main>

        <!-- Footer -->
        <section 
          class="footer"
          v-if="!isBottomHidden">
          <div class="left-container">
            <slot name="footer"/>
          </div>
          <!-- Right -->
          <div class="right-container">
            <!-- Created Date Diff -->
            <div 
              class="date-diff-container"
              v-show="bottomDateDiff">
              {{bottomDateDiff}}
            </div>
            <!-- Report Button -->
            <div 
              class="item report-container"
              @click="onReportButton()">
              <img src="~assets/icons/flag.svg" alt="flag">
            </div>
          </div>
        </section>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['data', 'topDateDiff', 'bottomDateDiff', 'isBottomHidden', 'isAuthorOfRfq'],
  computed: {
    ...mapGetters({
      contact: 'auth/GET_CONTACT'
    }),
    getLogoUrl() {
      const hiddenLogo = require('~/assets/icons/user.svg')
      const userLogo = this.data.logo_url ? this.data.logo_url : hiddenLogo

      if (this.isAuthorOfRfq) return userLogo

      if (!this.isThisUserCanRead) return hiddenLogo

      return userLogo
    },
    isThisUserCanRead() {
      const { contact_id } = this.data

      return this.contact.contact_id === contact_id
    }
  },
  methods: {
    onReportButton() {
      this.$emit('onReport')
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
@import '../../styles/index';

.card-container {
  .gray-border;
  background-color: @color-white;
  padding: @card-padding;
}
.card-wrapper {
  position: relative;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.header__profile {
  display: flex;
  align-items: top;

  .user-img-container {
    width: 36px;
    height: 36px;
    border: 1px solid @color-lightest-grey;
    border-radius: 50%;
    overflow: hidden;

    @media (min-width: 744px) {
      width: 40px;
      height: 40px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .identity-container {
    display: flex;
    flex: 1;
    margin-left: 12px;
    font-size: 12px;
    font-weight: 400;

    @media (min-width: 744px) {
      font-size: 15px;
    }
  }
}
.header__history {
  font-size: 12px;
  white-space: nowrap;
  font-weight: 500;
  color: @color-font-gray;
  text-transform: uppercase;
  margin-left: 8px;

  @media (min-width: 744px) {
    font-size: 15px;
  }
}

main {
  padding: @card-padding 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: @card-padding;
  border-top: 1px solid @color-border-gray;
  font-size: 11px;
  font-weight: 600;

  @media (min-width: 744px) {
    font-size: 14px;
  }

  .right-container {
    display: flex;
    align-items: center;
  }

  .item {
    margin-left: 6px;
  }

  .date-diff-container {
    // border: 1px solid @color-border-gray;
    // border-radius: @border-radius;
    color: @color-deep-gray;
    font-weight: 400;
    padding: 8px;
  }
  .report-container {
    width: 18px;
    height: 18px;
    cursor: pointer;

    @media (min-width: 744px) {
      width: 22px;
      height: 22px;
    }

    img {
      width: 100%;
      transform: rotate(11deg);
    }
  }
}
</style>
