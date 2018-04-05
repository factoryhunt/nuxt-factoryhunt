<template>
  <section class="body-contents">
    <div v-show="toggle.unsubscribed">
      <p>Thank you. No more bother you.</p>
    </div>
    <div v-show="!toggle.unsubscribed">
      <p>Are you sure to unsubscribe this website?</p>
      <div>
        <button @click="onSureButton">Sure</button>
        <button @click="onNoButton">No</button>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    head: {
      title: 'Unsubscribe'
    },
    asyncData ({redirect, query}) {
      if (!query.token) redirect('/')
    },
    data () {
      return {
        value: {
          lead: {}
        },
        token: this.$route.query.token,
        toggle: {
          unsubscribed: false
        },
      }
    },
    methods: {
      unsubscribeEmail (lead_id) {
        const date = new Date()
        const data = {
          lead_data: {
            data: {
              email_subscription: 'N'
            },
            notes: `${date} - Unsubscribed by user, `
          }
        }
        return new Promise((resolve, reject) => {
          axios.post(`/api/data/lead/${lead_id}`, data)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      async onSureButton () {
        try {
          await this.unsubscribeEmail(this.value.lead.lead_id)
          this.toggle.unsubscribed = true
        } catch (err) {
          this.toggle.unsubscribed = true
        }
      },
      onNoButton () {
        location.replace('/')
      },
      decodeToken (token) {
        const data = {
          token
        }
        return new Promise((resolve, reject) => {
          axios.post('/api/jwt/decode', data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    },
    async mounted () {
      const { data } = await this.decodeToken(this.token)
      this.value.lead = data
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index.less";
</style>
