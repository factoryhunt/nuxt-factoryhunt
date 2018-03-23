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
    asyncData ({query}) {
      console.log(query.e)
    },
    data () {
      return {
        toggle: {
          unsubscribed: false
        }
      }
    },
    methods: {
      getLeadData () {

      },
      unsubscribeEmail () {
        return new Promise((resolve, reject) => {

          axios.post(`/api/data/lead/`)
        })
      },
      onSureButton () {
        this.toggle.unsubscribed = true
      },
      onNoButton () {
        location.replace('/')
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
