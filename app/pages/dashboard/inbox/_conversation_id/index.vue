<template>
  <div class="dashboard-page-container">

    <!-- Left-side -->
    <div class="left-container">
      <div class="profile-container">
        <div class="profile-inner-container">
          <div class="logo-container">
            <img id="logo-image" :src="messages[0].logo_url">
          </div>
          <div class="contents-container">
            <div class="title-contents">
              <p class="title">{{ account.account_name }}</p>
              <p v-if="contact.first_name" class="sub-title">{{messages[0].first_name + ' ' + messages[0].last_name}}<small></small></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right-side -->
    <div class="right-container">
      <form @submit.prevent="onSendMessage">
        <div class="message-container">
          <div v-for="(message, index) in messages" :id="'list-' + index" :class="message.sender_id === contact.contact_id ? 'list message-right' : 'list message-left'" :key="index">
            <div>
              <div class="logo-container">
                <img class="logo-image-small" :src="message.logo_url">
              </div>
            </div>
            <div class="panel-body">
              <div class="body-container">
                <p class="body">{{message.body}}</p>
              </div>
              <div class="date-container">
                <p>{{message.created_date}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="input-container">
          <div class="input-body-container">
            <textarea name="new-message" id="new-message" v-model="value.message" cols="30" rows="10"></textarea>
          </div>
          <div class="input-button-container">
            <button type="submit">
              <span>Send Message</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import { mapGetters } from 'vuex'
  export default {
    head () {
      return {
        title: 'Message'
      }
    },
    async asyncData({params, store}) {
      const contact = store.getters['auth/GET_CONTACT']
      const { data } = await axios.get(`/api/data/inbox/contact_id/${contact.contact_id}/${params.conversation_id}`)
      return {
        conversation_id: params.conversation_id,
        contact: contact,
        messages: data,
      }
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          message: ''
        }
      }
    },
    methods: {
      async onSendMessage () {
        try {
          await this.postMessageToServer()
          location.reload()
        } catch (err) {
          alert('sending failed')
        }
      },
      postMessageToServer () {
        return new Promise(async (resolve, reject) => {
          const data = {
            sender_id: this.contact.contact_id,
            recipient_id: this.messages[this.messages.length-1].contact_id,
            conversation_id: this.messages[this.messages.length-1].conversation_id,
            body: this.value.message
          }
          axios.put('/api/data/inbox/message', {
            message_data: data
          })
            .then(res => {
              console.log(res)
              resolve()
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  .dashboard-page-container {
    .left-container {
      .profile-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 240px;
        border: 1px solid @color-light-grey;
        border-radius: @border-radius;

        .profile-inner-container {
          position: relative;
          text-align: center;

          .logo-container {
            width: 150px;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            margin-top: 16px;
            margin-bottom: 16px;
            border-radius: 50%;
            box-shadow: 1px 1px 10px lightgray;
            overflow: hidden;

            #logo-image {
              width: auto;
              height: auto;
              max-height: 100%;
              max-width: 100%;
              min-width: 100%;
              margin: auto;
            }
          }

          .contents-container {
            padding: 0 20px;

            .title-contents {
              margin-bottom: 22px;
              .title {
                font-weight: 500;
                font-size: 24px;
                margin: 0;
              }
              .sub-title {
                font-size: 20px;
                font-weight: 300;
                margin: 0;
              }
            }
            button {
              color: @color-font-base;
              border: 1px solid @color-input-placeholder;
              width: 100%;
              font-size: 14px;
              margin-bottom: 8px;
              padding-top: 6px;
              padding-bottom:6px;
              font-weight: 600;
            }
            #edit-button {
              margin-bottom: 18px;
            }
          }
        }
      }
    }

    .right-container {
      padding-left: 270px;

      .message-container {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid gray;
        padding: 17px;
        height: 480px;
        overflow: scroll;

        .message-left {
          margin-right: 200px;
          background-color: lightgray;
          margin-bottom: 20px;
        }
        .message-right {
          margin-left: 200px;
          background-color: darkgray;
          margin-bottom: 20px;
        }
      }

      .logo-image-small {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 1px solid #dbdbdb;
      }

      .logo-container {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
      }

      .panel-body {
        background-color: lightgray;
        margin-left: 60px;
        padding: 5px;
        border-radius: 7px;
        border: 1px solid darkgray;

        .body-container {
          p {
            margin: 0;
          }
        }

        .date-container {
          p {
            margin: 10px 0 0 0;
          }
        }
      }

      .input-container {
        .input-body-container {
          position: absolute;
          width: 771px;

          textarea {
            height: 60px;
            margin-top: 0px;
          }
        }

        .input-button-container {
          text-align: right;
          margin: 10px;
          padding-top: 13px;

          button {
            cursor: pointer;
            -webkit-transition: background 300ms, border-color 300ms;
            -moz-transition: background 300ms, border-color 300ms;
            -ms-transition: background 300ms, border-color 300ms;
            -o-transition: background 300ms, border-color 300ms;
            transition: background 300ms, border-color 300ms;
            position: relative;
            display: inline-block;
            text-align: center;
            text-decoration: none;
            border-radius: 4px;
            width: auto;
            line-height: 18px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #484848;
            font-weight: normal;
            border: 1px solid transparent;
            padding-right: 16px;
            padding-left: 16px;
            border-color: #484848;
            background: #ffffff;

            span {
              font-size: 15px;
              line-height: 18px;
              color: #484848;
            }
          }
        }
      }
    }
  }
</style>
