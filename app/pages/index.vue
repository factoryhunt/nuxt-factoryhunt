<template>
  <section class="container">
    <div>
      <h1 class="title">
        Factory Hunt
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <p>
        {{value}}
      </p>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    async asyncData () {
      let { data } = await axios.get(`/api/data/search/toy`)
      return {
        value: data
      }
    }
  }
</script>
