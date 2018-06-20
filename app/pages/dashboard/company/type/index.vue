<template>
  <div>
    <div class="header">
      <h1 class="title">Change your account type</h1>
      <p class="sub-title">Some of the menu on your dashboard may be hidden when you change your account type. <br>You can change it back anytime you want.</p>
    </div>
    <form 
      class="form"
      @submit.prevent="update()">
      <select-input 
        class="select"
        :array="types"
        v-model="type"/>
      <submit-button
        class="button"
        :isLoading="isLoading">
        Save
      </submit-button>
    </form>
  </div>
</template>

<script>
// components
import SubmitButton from '~/components/Button'
import SelectInput from '~/components/Inputs/Select'
// libs
import axios from '~/plugins/axios'
import { showTopAlert } from '~/utils/alert'
export default {
  components: {
    SelectInput,
    SubmitButton
  },
  props: ['account'],
  data: () => ({
    types: ['Buyer', 'Supplier', 'Buyer & Supplier'],
    type: '',
    isLoading: false
  }),
  methods: {
    init() {
      this.mappingData()
    },
    mappingData() {
      this.type = this.account.account_type
    },
    async update() {
      this.isLoading = true
      const data = {
        account_type: this.type
      }

      try {
        await axios.put(`/api/data/account/${this.account.account_id}`, {
          account_data: data
        })
        location.reload()
      } catch (err) {
        console.log('err', err)
        showTopAlert(
          this.$store,
          false,
          'Sorry, server connection is not stable. Please try it later again.'
        )
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>


<style lang="less" scoped>
@import '~assets/css/index';
* {
  margin: 0;
  padding: 0;
}

.header {
  .sub-title {
    margin-top: 8px;
  }
}

.form {
  margin-top: 40px;
}
.select {
  width: 200px;
}
.button {
  margin-top: 12px;
}
</style>

