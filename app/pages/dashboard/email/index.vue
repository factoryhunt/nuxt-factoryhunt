<template>
  <section>
    <h2>Email Bot</h2>
    <div class="filter-container each-container">

      <!-- Select Options -->
      <div>
        <p>Lead id</p>

        <!-- Type One -->
        <div>
          <input type="radio" value="lead-filter-type-one" v-model="value.picked">
          <input id="lead-id-min" type="number" v-model="value.minLeadId">
          ~
          <input id="lead-id-max" type="number" v-model="value.maxLeadId">
        </div>
        <!-- Type Two -->
        <div>
          <input type="radio" value="lead-filter-type-two" v-model="value.picked">
          <input id="lead-id-target" type="text" v-model="value.leadIds">
        </div>

        <button @click="onSearchButton">Search</button>
      </div>

      <!-- Select Template -->
      <div>
        <p>Email Template</p>
        <select v-model="value.emailTemplate">
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
        <div>
          <div class="template" v-show="value.emailTemplate === 'A'">
            <p>
              This is Daniel Jeong, CEO at Factory Hunt.
            </p>
            <p>Factory Hunt is a global hub of manufacturer & supplier listings.
              <span class="bold underline">We made the service to help suppliers discover new business opportunities.</span>
              You could simply upload your PDF catalog on factoryhunt.com and promote your business to potential buyers for FREE!
              Please feel free to directly contact me if you have any questions regarding the service. Thank you for your time. 
            </p>
          </div>
          <div class="template" v-show="value.emailTemplate === 'B'">
            <p>This is Daniel Jeong, Co-founder and CEO at Factory Hunt. We are a tech startup in Seoul, Korea developing B2B wholesale trading website. We are trying to make a helpful website for wholesale suppliers. If you don't mind, please take a moment and upload your product catalog on our website. You will be able to make a very attractive webpage in a few clicks and promote your business to potential buyers.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Result -->
    <div class="leads-container">
      <loader
        class="spinkit-default visible"
        id="data-loader"
        v-if="toggle.isSearching"
      />
      <div v-for="(lead,index) in value.leads" :key="index" class="lead-container">
        <p>
          {{lead.lead_id}} {{lead.company}}<br>
          <span v-if="lead.notes">note: {{lead.notes}}</span>
        </p>
      </div>
    </div>

    <!-- Send Button container -->
    <div class="button-container each-container">
      <button
        class="button-orange"
        @click="onSendEmailButton"
        v-show="!toggle.isSendingEmail">
        Send Email
      </button>
      <loader class="spinkit-input visible" id="loader" v-show="toggle.isSendingEmail"/>
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
          picked: 'lead-filter-type-one',
          minLeadId: 0,
          maxLeadId: 0,
          leadIds: '',
          emailTemplate: 'A'
        },
        toggle: {
          isSearching: false,
          isSendingEmail: false
        }
      }
    },
    computed: {
      getLeadDataToPostServer () {
        let data = {
          email_template: this.value.emailTemplate,
          lead_filter_type: this.value.picked
        }

        if (this.value.picked === "lead-filter-type-one") {
          data.min_lead_id = this.value.minLeadId
          data.max_lead_id = this.value.maxLeadId
        }
        else if (this.value.picked === "lead-filter-type-two") {
          data.lead_ids = this.value.leadIds
        }
        else {
          data = {}
        }

        return data
      }
    },
    methods: {
      sendEmail () {
        const result = confirm('Are you sure?')
        if (!result) return

        const data = this.getLeadDataToPostServer

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
        this.toggle.isSearching = true
        const data = this.getLeadDataToPostServer

        axios.post(`/api/data/lead/email`, data)
          .then(res => {
            this.toggle.isSearching = false
            this.value.leads = res.data
          })
          .catch(err => {
            console.log(err)
            this.toggle.isSearching = false
          })
      }
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
  .filter-container {
    div {
      margin-top: 12px;
    }
    #lead-id-target {
      display: inline-block;
      width: 90%;
    }
  }
</style>
