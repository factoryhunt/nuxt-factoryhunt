<template>
  <div>
    <h1>Sign Up</h1>
    <p>{{lead_id}}</p>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import TopAlertBar from '~/components/Alert/TopAlertBar'
import { showTopAlert } from '~/utils/alert'
import Loader from '~/components/Loader'
export default {
  components: {
    TopAlertBar,
    Loader
  },
  async asyncData({ query, error }) {
    const { token } = query

    try {
      if (!token) throw new Error()
      const { data } = await axios.post('/api/jwt/decode', { token })

      return {
        lead_id: data.lead_id
      }
    } catch (err) {
      console.log('token decode error\n', err)
      error({ statusCode: 404, message: 'Your token is not valid.' })
    }
  },
  data: () => ({
    lead_id: 0
  })
}
</script>
