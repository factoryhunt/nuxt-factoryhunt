<template>
  <div id="activity-container">
    <section id="activity-section">
      <div class="header">
        <span class="title">My Activities</span>
      </div>
      <div class="body">
        <div class="activity-wrapper">
          <div v-if="user">
            <ul>
              <!-- <li v-show="isUserBuyer" class="activity-item">{{getTotalBuyingLead}}</li> -->
              <li v-show="isUserBuyer" class="activity-item">{{getTotalRequest}}</li>
              <li v-show="isUserSupplier" class="activity-item">{{getTotalQuote}}</li>
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
        <li><a href="/about" target="_blank">About</a></li>
        <li class="dot">•</li>
        <li><a href="/contact" target="_blank">Contact</a></li>
        <li class="dot">•</li>
        <li><a href="/pricing" target="_blank">Pricing</a></li>
        <li class="dot">•</li>
        <li><a href="/terms" target="_blank">Terms</a></li>
        <li class="dot">•</li>
        <li><a href="/privacy" target="_blank">Privacy</a></li>
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
import axios from '~/plugins/axios'
import ModalAuth from '~/components/Modal/Auth'
import social_links from '~/assets/models/social_links.json'
import { addComma } from '~/utils/text'
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
  components: {
    ModalAuth
  },
  data: () => ({
    socialLinks: social_links,
    isModalAuthHidden: true,
    totalRequest: 0,
    totalQuote: 0
  }),
  computed: {
    ...mapGetters({
      contact: 'auth/GET_CONTACT',
      isUserBuyer: 'auth/IS_USER_BUYER',
      isUserSupplier: 'auth/IS_USER_SUPPLIER'
    }),
    getContactId() {
      return this.contact.contact_id
    },
    getTotalBuyingLead() {
      const { totalRequest, totalQuote } = this

      const totalBuyingLead = totalRequest + totalQuote
      let result = `Total ${totalBuyingLead}`
      result = totalBuyingLead <= 1 ? `${result} Buying Lead` : `${result} Buying Leads`

      return addComma(result)
    },
    getTotalRequest() {
      const { totalRequest } = this

      let result = `Total ${totalRequest}`
      result = totalRequest <= 1 ? `${result} Request` : `${result} Requests`

      return addComma(result)
    },
    getTotalQuote() {
      const { totalQuote } = this

      let result = `Total ${totalQuote}`
      result = totalQuote <= 1 ? `${result} Quote` : `${result} Quotes`

      return addComma(result)
    }
  },
  methods: {
    init() {
      this.fetchMyActivities()
    },
    async fetchMyActivities() {
      const API = `/api/data/buying_leads/activity/${this.getContactId}`
      try {
        const { data } = await axios.get(API)
        this.mappingData(data)
      } catch (err) {
        console.log('err', err)
      }
    },
    mappingData(data) {
      const { request_count, quote_count } = data

      this.totalRequest = request_count
      this.totalQuote = quote_count
    },
    clickRequest() {
      if (!this.user) return (this.isModalAuthHidden = false)

      if (!this.isUserBuyer) return alert('This service is only for Buyers.')

      location.href = '/dashboard/rqs'
    }
  },
  mounted() {
    this.init()
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
    padding: 20px 6px;
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
