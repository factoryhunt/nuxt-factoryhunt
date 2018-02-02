<template>
  <div class="page-container">

    <h1>Contact Us</h1>
    <div class="divider"></div>

    <div class="inner-contents">

      <div class="right-container">
        <form @submit.prevent="sendEmail(email, quiry)" class="form-container">

          <h3 class="title" v-lang.contact></h3>
          <br>
          <div class="input-container">
            <input required v-model="email" type="email" :placeholder="getEmailPlaceholder">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </div>

          <textarea required v-model="quiry" rows="12" :placeholder="getMessagePlaceholder"></textarea>

          <div class="button-container">
            <button type="submit" class="button-orange" v-lang.button></button>
          </div>
        </form>
      </div>

      <div class="left-container">
        <div class="location-container">
          <hr>
          <h3 class="title" v-lang.location></h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22614192.714437235!2d111.92435988534045!3d37.06095545855957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3e3561b583f%3A0x6683b2bd9f0703b3!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDrtInsnYDsgqzroZwgMTMz!5e0!3m2!1sko!2skr!4v1514872697200" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    head () {
      return {
        title: 'Contact Us'
      }
    },
    data () {
      return {
        placeholder: {
          email: 'contact@example.com',
          textarea: 'Enter your message'
        },
        email: '',
        quiry: ''
      }
    },
    messages: {
      eng: {
        title: 'Contact Us',
        contact: 'Contact',
        emailPlaceholder: 'Email',
        messagePlaceholder: 'Enter your message',
        button: 'Send inquiry',
        location: 'Location'
      },
      kor: {
        title: '문의하기',
        contact: '문의',
        emailPlaceholder: '이메일',
        messagePlaceholder: '내용을 입력하세요',
        button: '문의하기',
        location: '위치'
      }
    },
    methods: {
      sendEmail (email, quiry) {
        const data = {
          email: email,
          quiry: this.convertEnterToBrTag(quiry),
          subject: 'inquiry for Factory Hunt'
        }
        axios.post('/api/mail/contact', data)
          .then(() => {
            alert('Your message has been sent successfully. We will get back to you as soon as possible.')
          })
          .catch(() => {
            alert('Failed. Please try again.')
          })
      },
      convertEnterToBrTag: function (subject) {
        return subject.replace(/\n/g, '<br />')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  .body-contents {
    margin-top: 20px;
  }

  .inner-contents {
    position: relative;
  }

  .left-container {
  }
  .location-container {
  }
  .location-container .title {
    margin-top: 30px;
  }
  .location-container iframe {
    margin-top: 30px;
    width:100%;
    height:445px;
    border-radius: 4px;
  }

  .right-container {
  }
  .form-container {
    font-size: 17px;
  }
  .form-container .input-container {
    position: relative;
    border:1px solid lightgrey;
    border-radius: 4px;
    margin-bottom: 25px;
  }
  .form-container .input-container input {
    width: 100%;
    border-radius: 4px;
    padding: 10px 50px 10px 10px;
    border: none;
    box-shadow: none;
    outline: none;
  }
  .form-container .input-container i {
    position: absolute;
    right: 20px;
    top: 32%;
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
  }
  @media ( min-width: 1128px ) {
    .left-container {
      position: relative;
      padding-right: 450px;
      min-height: 550px;
    }

    .form-container .title {
    }
    .location-container hr {
      display: none;
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

