<template>
  <section>
    <h2>Filtering</h2>
    <div class="filter-container each-container">
      <p>Lead id</p>
      <input id="lead-id-min" type="number" v-model="value.minLeadId">
      ~
      <input id="lead-id-max" type="number" v-model="value.maxLeadId">
      <button @click="onSearchButton">Search</button>
    </div>
    <div class="leads-container">
      <div v-for="(lead,index) in value.leads" :key="index" class="lead-container">
        <p>
          {{lead.lead_id}} {{lead.company}}<br>
          <span v-if="lead.notes">note: {{lead.notes}}</span>
        </p>
      </div>
    </div>
    <div class="button-container each-container">
      <button
        class="button-orange"
        @click="onSendEmailButton"
        v-show="!toggle.isSendingEmail">
        Send Email
      </button>
      <loader id="loader" v-show="toggle.isSendingEmail"/>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import loader from '~/components/Loader'
  export default {
    components: {
      loader
    },
    data () {
      return {
        value: {
          leads: [],
          minLeadId: 0,
          maxLeadId: 0
        },
        toggle: {
          isSendingEmail: false
        }
      }
    },
    methods: {
      sendEmail () {
        const result = confirm('Are you sure?')
        if (!result) return
        const data = {
          min_lead_id: this.value.minLeadId,
          max_lead_id: this.value.maxLeadId
        }
        return new Promise((resolve, reject) => {
          axios.post('/api/mail/ads', data)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      async onSendEmailButton () {
        this.toggle.isSendingEmail = true
        try {
          await this.sendEmail()
          this.toggle.isSendingEmail = false
        } catch (err) {
          console.log(err)
          this.toggle.isSendingEmail = false
        }
      },
      onSearchButton () {
        const data = {
          min_lead_id: this.value.minLeadId,
          max_lead_id: this.value.maxLeadId
        }
        axios.post(`/api/data/lead/email`, data)
          .then(res => {
            this.value.leads = res.data
          })
          .catch(err => {
            console.log(err)
          })
      }

    },
    created () {
      console.log('/email created')
    },
    mounted () {
      console.log('/email mounted')
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index.less";

  .button-orange {
    font-size: @font-size-large;
    font-weight: @font-weight-bold;
    margin: 10px 0;
  }

  .each-container {
    margin-top: 20px;
  }
  .lead-container {
    margin: 8px 0;
  }
</style>
