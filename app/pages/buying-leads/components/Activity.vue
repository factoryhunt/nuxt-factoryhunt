<template>
  <div id="activity-container">
    <section id="activity-section">
      <div class="header">
        <span class="title">Your Activities</span>
      </div>
    </section>
    <section id="ads-section">
      <div class="header">
        <span class="title">Featured</span>
      </div>
    </section>
    <div class="info">
      <ul>
        <li><a href="/about">About</a></li>
        <li class="dot">•</li>
        <li><a href="/contact">Contact</a></li>
        <li class="dot">•</li>
        <li><a href="/terms">Terms</a></li>
        <li class="dot">•</li>
        <li><a href="/privacy">Privacy</a></li>
      </ul>
      <div class="copyright">
        <span>© 2018 FACTORY HUNT</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/buying_leads/index';

#activity-container {
  width: 225px !important;
  margin-left: @container-margin;
}

section {
  .gray-border;
  background-color: @color-white;
  padding: @section-padding;
  margin-top: @container-margin;

  &:first-child {
    margin-top: 0;
  }
}

.title {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
}

.info {
  margin-top: @container-margin;
  padding-top: 10px;
  border-top: 1px solid @color-border-gray;
  color: @color-font-gray;

  .dot {
    margin: 0 4px;
  }
  ul {
    list-style: none;
  }
  li {
    display: inline-block;
    font-size: 13px;
    font-weight: 400;

    a {
      color: @color-font-gray !important;
    }
  }
}

.copyright {
  margin-top: 10px;
  font-size: 12px;
}
</style>
