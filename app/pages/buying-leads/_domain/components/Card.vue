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
                <img 
                  src="~assets/icons/user.svg">
              </a>
            </div>
            <div class="identity-container">
              <slot name="name"></slot>
            </div>
          </div>
          <!-- History -->
          <div class="header__history">
            <span>1 Hours ago</span>
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
          v-if="data">
          <div class="left-container">
            <slot name="footer"/>
          </div>
          <!-- Right -->
          <div class="right-container">
            <!-- Report Button -->
            <div 
              class="report-container"
              @click="onReportButton">
              <img src="~assets/icons/flag.svg" alt="options">
            </div>
          </div>
        </section>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'currentTime'],
  methods: {
    onQuoteButton() {},
    onReportButton() {
      this.$emit('onReport')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/index';

.card-container {
  .gray-border;
  background-color: @color-white;
  padding: @card-padding;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.header__profile {
  display: flex;
  align-items: center;

  .user-img-container {
    width: 40px;
    height: 40px;
    border: 1px solid @color-lightest-grey;
    border-radius: 50%;
  }
  img {
    width: 100%;
  }

  .identity-container {
    display: flex;
    flex: 1;
    margin-left: 12px;
    font-size: 14px;
    font-weight: 400;
  }
}
.header__history {
  font-size: 14px;
  font-weight: 500;
  color: @color-font-gray;
  text-transform: uppercase;
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
  font-size: 13px;
  font-weight: 600;

  .report-container {
    width: 22px;
    height: 22px;
    cursor: pointer;

    img {
      width: 100%;
      transform: rotate(11deg);
    }
  }
}
</style>
