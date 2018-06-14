<template>
  <div id="activity-container">
    <section id="activity-section">
      <div class="header">
        <span class="title">My Activity</span>
      </div>
      <div class="body">
        <div class="activity-wrapper">
          <div v-if="user">
            <ul>
              <li v-show="isUserBuyer" class="activity-item">Total 0 Request(s)</li>
              <li v-show="isUserSupplier" class="activity-item">Total 0 Quote(s)</li>
            </ul>
          </div>
          <div v-else>
            <span>Please Login to Request Quotes.</span>
          </div>
        </div>
        <a 
          @click="clickRequest()"
          class="button orange">Request Quote</a>
      </div>
    </section>
    <section id="ads-section">
      <div class="header">
        <span class="title">Featured</span>
      </div>
    </section>
    <!-- Nav -->
    <nav class="info">
      <ul>
        <li><a href="/about">About</a></li>
        <li class="dot">•</li>
        <li><a href="/contact">Contact</a></li>
        <li class="dot">•</li>
        <li><a href="/terms">Terms</a></li>
        <li class="dot">•</li>
        <li><a href="/privacy">Privacy</a></li>
      </ul>
    </nav>
    <footer>
      <div class="copyright">
          <span>© 2018 FACTORY HUNT</span>
        </div>
        <div class="social">
          <a 
            :href="socialLinks.facebook"
            target="_blank"><img src="~assets/icons/facebook_black.svg"></a>
          <a 
            :href="socialLinks.youtube"
            target="_blank"><img src="~assets/icons/youtube_black.svg"></a>
        </div>
    </footer>
    <!-- Modal -->
    <modal-auth
      :isHidden="isModalAuthHidden"
      @close="isModalAuthHidden = true"/>
  </div>
</template>

<script>
import ModalAuth from '~/components/Modal/Auth'
import social_links from '~/assets/models/social_links.json'
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
  components: {
    ModalAuth
  },
  data: () => ({
    socialLinks: social_links,
    isModalAuthHidden: true
  }),
  computed: {
    ...mapGetters({
      isUserBuyer: 'auth/IS_USER_BUYER',
      isUserSupplier: 'auth/IS_USER_SUPPLIER'
    })
  },
  methods: {
    clickRequest() {
      if (!this.user) return (this.isModalAuthHidden = false)

      if (!this.isUserBuyer) return alert('This service is only for Buyers.')

      location.href = '/dashboard/rqs'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/buying_leads/index';

#activity-container {
  display: none;
  width: 225px !important;
  margin-left: @container-margin;

  @media (min-width: 1128px) {
    display: block;
  }
}

ul {
  list-style: none;
}

section {
  .gray-border;
  background-color: @color-white;
  padding: @section-padding;
  margin-top: @container-margin;

  &:first-child {
    margin-top: 0;
  }

  .title {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .body {
    font-size: 14px;
    font-weight: 400;
  }
  .no-login {
    padding-top: 20px;
  }

  .activity-wrapper {
    border-bottom: 1px solid @color-border-gray;
    padding: 20px 11px;
  }
  .activity-item {
    margin-top: 6px;

    &:first-child {
      margin-top: 0;
    }

    @media (min-width: 744px) {
      font-size: 14px;
    }
  }

  .button {
    display: block;
    padding: 10px 16px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    border-radius: @border-radius;
    margin-top: 12px;
  }
  .button.orange {
    background-color: @color-orange;
    color: @color-white;
  }
  .button.white {
    background-color: @color-white;
    color: @color-orange;
    border: 1px solid @color-orange;
  }
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

footer {
  margin-top: 10px;
}
.copyright {
  font-size: 12px;
}
.social {
  margin-top: 6px;
  a {
    display: inline-flex;
  }
  img {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
}
</style>
