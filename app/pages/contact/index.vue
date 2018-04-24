<template>
  <div class="page-container">

    <h1>Contact Us</h1>
    <div class="divider"></div>

    <div class="inner-contents">

      <!-- Contact Form -->
      <div class="right-container">
        <form @submit.prevent="sendInquiry" class="form-container">

          <h2 class="title">{{ $t('contact.title') }}</h2>
          <div class="input-container">
            <input required v-model="email" type="email" :placeholder="$t('contact.emailPlaceholder')">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </div>
          <textarea required v-model="inquiry" rows="12" :placeholder="$t('contact.messagePlaceholder')"></textarea>
          <div class="button-container">
            <button type="submit" class="button-orange">{{ $t('contact.button') }}</button>
          </div>
        </form>
      </div>

      <!-- Address -->
      <div class="left-container">
        <div class="location-container">
          <h2 class="title">{{ $t('contact.location') }}</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22614192.714437235!2d111.92435988534045!3d37.06095545855957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3e3561b583f%3A0x6683b2bd9f0703b3!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDrtInsnYDsgqzroZwgMTMz!5e0!3m2!1sko!2skr!4v1514872697200" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { sendEmail } from '~/utils/email'
  export default {
    head () {
      return {
        title: this.$t('contact.title'),
        meta: [
          { hid: 'description', name: 'description', content: 'Contact Factory Hunt. Find email and contact information for Factory Hunt, including help, support, and media inquiries.' }
        ],
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/contact` }
        ]
      }
    },
    data () {
      return {
        placeholder: {
          email: 'contact@example.com',
          textarea: 'Enter your _conversation_id'
        },
        email: '',
        inquiry: ''
      }
    },
    computed: mapGetters({
      contact: 'auth/GET_CONTACT'
    }),
    methods: {
      async sendInquiry () {
        const data = {
          email: this.email,
          inquiry: this.inquiry,
          subject: 'inquiry for Factory Hunt.'
        }
        try {
          await sendEmail(data)
          alert(this.$t('alert.email.success'))
        } catch (err) {
          alert(this.$t('alert.email.fail'))
        }
      }
    },
    mounted () {
      this.email = this.contact.contact_email || ''
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  .page-container {
    padding-bottom: 30px;
  }
  .inner-contents {
    position: relative;
    margin-top: 30px;
  }

  .title {
    margin-top: 0;
    font-size: @font-size-large;
  }

  .left-container {
  }
  .location-container {
    margin-top: 30px;
    iframe {
      width:100%;
      height:350px;
      border-radius: 4px;
    }
  }

  .form-container {
    font-size: 17px;
  }
  .form-container .input-container {
    position: relative;
    border:1px solid lightgrey;
    border-radius: @border-radius;
    margin-bottom: 25px;
  }
  .form-container .input-container input {
    width: 100%;
    border-radius: @border-radius;
    padding: 10px 50px 10px 10px;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    font-size: 16px;
  }
  .form-container .input-container i {
    position: absolute;
    right: 20px;
    top: 26%;
  }
  .form-container textarea {
    font-size: 17px;
    margin-bottom: 27px;
    width: 100%;
  }
  .form-container button {
    width: 100%;
    height: 50px;
    font-weight: 500;
    font-size: 16px;
  }

  @media ( min-width: 744px ) {
    .page-container {
      padding-bottom: 0;
    }
  }
  @media ( min-width: 1128px ) {
    .left-container {
      position: relative;
      padding-right: 450px;
      min-height: 550px;
    }

    .form-container .title {
    }
    .location-container {

      iframe {
        height:405px;
      }
    }
    .right-container {
      z-index: 1;
      position: absolute;
      right: 0;
      top: 0;
      width: 400px;
    }
  }
</style>

