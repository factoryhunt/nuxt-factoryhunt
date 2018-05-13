<template>
  <main class="card-container">
    <div class="card-wrapper">
      <!-- Header -->
      <section class="header">
        <!-- Buyer Profile -->
        <div class="header__profile">
          <div class="user-img-container">
            <a href="/user">
            <img 
              src="~assets/icons/user.svg"
              alt="user-profile-img"></a>
          </div>
          <div class="identity-container">
            <span class="name">
              <a href="/user">Filip Zajac</a></span>
            <span class="role">Importing Header Office Manager</span>
          </div>
        </div>
        <!-- History -->
        <div class="header__history">
          <span>1 Hours ago</span>
        </div>
      </section>

      <!-- Verified Mark -->
      <section class="verify-container">
        <ul>
          <li><tool-tip
              label="South Korea">This buyer posted in South Korea</tool-tip></li>
          <li><tool-tip
              label="1K Pieces">Buyer wants 1K Pieces quantities.</tool-tip></li>
          <li><tool-tip
              label="Email">This buyer emails is confirmed.</tool-tip></li>
          <li><tool-tip
              label="Active Buyer">This is test tool-tip box! This is test tool-tip box! This is test tool-tip box! This is test tool-tip box!</tool-tip></li>
        </ul>
      </section>

      <!-- Main Content -->
      <section class="content">
        <h1>{{data.title}}</h1>
        <div class="description" v-html="data.description"></div>
      </section>

      <!-- Other Requirement -->
      <section class="other-requirement">
        <h3>Other Requirements</h3>
      </section>

      <!-- Images -->
      <section class="product">
        <div class="product-wrapper">
          <div class="product__image-container">
            <img src="https://sc01.alicdn.com/kf/UTB8.Ljmy5DEXKJk43Oqq6Az3XXaH.jpg_200x200xz.jpg">
          </div>
          <div class="product__image-container">
            <img src="https://zdnet2.cbsistatic.com/hub/i/r/2017/07/18/071068d1-e257-4abf-811d-48a626f621f7/resize/770xauto/72e298cc964f48604e0edb0a3ee72339/bear.jpg">
          </div>
          <div class="product__image-container">
            <img src="https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc34800506787363e917e96d6b091817&auto=format&fit=crop&w=1600&q=60">
          </div>
          <div class="product__image-container">
            <img src="https://images.unsplash.com/photo-1524253860834-0e02422248bc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9758e730ae59212caca2bf7d046770b8&auto=format&fit=crop&w=1600&q=60">
          </div>
          <div class="product__image-container">
            <img src="https://images.unsplash.com/photo-1496198225320-0dd08d34b9d8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e975bc534cdf469fa29525749e5d0ee2&auto=format&fit=crop&w=1600&q=60">
          </div>
        </div>
      </section>

      <!-- Footer -->
      <section class="footer">
        <div class="left-container">
          <basic-button
            id="quote-button"
            class="button"
            @onButton="onQuoteButton">
            Quote Now
          </basic-button>
          <basic-button
            id="copy-button"
            type="black"
            class="button">
            Link Copy
          </basic-button>
        </div>
        <div class="right-container">
          <div 
            class="report-container"
            @click="onReportButton">
            <img src="~assets/icons/flag.svg" alt="options">
          </div>
        </div>
      </section>
    </div>
    
  </main>
</template>

<script>
// components
import ToolTip from '~/components/ToolTip'
import BasicButton from '~/components/Button'
export default {
  components: {
    ToolTip,
    BasicButton
  },
  props: ['data', 'currentTime'],
  methods: {
    onQuoteButton() {},
    onReportButton() {}
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

@card-padding: 20px;

* {
  margin: 0;
  padding: 0;
}

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
  align-items: flex-start;

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
    // align-items: center;
    flex-direction: column;
    margin-left: 12px;
    font-size: 14px;
    font-weight: 400;

    span {
      display: block;
    }
    .name {
      font-weight: 500;

      a {
        color: @color-black;
      }
    }
    .role {
      color: @color-font-gray;
      margin-top: 3px;
    }
  }

  .verify-container {
    list-style: none;
    padding: 0;
    margin-top: 20px;
    margin-left: 0;
  }
  li {
    .gray-border;
    display: inline-flex;
    margin-right: 12px;
    margin-bottom: 12px;
    background-color: @color-bg-gray;
    font-size: 13px;
  }
}
.header__history {
  font-size: 14px;
  font-weight: 500;
  color: @color-font-gray;
  text-transform: uppercase;
}

.verify-container {
  ul {
    list-style: none;
    padding: 0;
    margin-top: 20px;
    margin-left: 0;
  }
  li {
    .gray-border;
    display: inline-flex;
    margin-right: 12px;
    margin-bottom: 12px;
    background-color: @color-bg-gray;
    font-size: 13px;
  }
}

// Content
.content {
  padding-top: @card-padding;
}
h1 {
  font-size: 28px;
}
.description {
  padding-top: @card-padding;
  font-size: 16px;
}

// Other Requirements

// Product Images
.product {
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product__image-container {
  display: inline-flex;
  width: 135px;
  height: 135px;
  box-shadow: 0px 2px 4px @color-light-gray;
  border-radius: @border-radius;
  overflow: hidden;
  margin-right: 12px;
  margin-bottom: 12px;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
  }
}

.footer {
  margin-top: @card-padding;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: @card-padding;
  border-top: 1px solid @color-border-gray;
  font-size: 13px;
  font-weight: 600;

  .button {
    padding: 11px 14px;
    margin-right: 16px;
    text-transform: uppercase;
  }

  .right-container {
  }
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
