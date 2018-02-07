<template>
  <section id="alert" :class="alertState ? 'alert-container success' : 'alert-container fail'">
    <h5 class="message" v-html="alertMsg"></h5>
    <i @click="onHideButton" id="hide-button" class="fa fa-times" aria-hidden="true"></i>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        alertState: 'alert/GET_STATE',
        alertMsg: 'alert/GET_MSG'
      })
    },
    methods: {
      onHideButton () {
        $(document).ready(() => {
          $('#alert').hide()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  .alert-container {
    display: none;
    position: relative;
    height: 50px;
    text-align: center;

    &.success {
      background-color: @color-alert-green;
    }
    &.fail {
      background-color: @color-light-red;
    }

    .message {
      margin: 0;
      line-height: 50px;
      font-size: @font-size-small;
      font-weight: @font-weight-medium;
    }

    #hide-button {
      font-size: @font-size-small;
      font-weight: @font-weight-ultra-thin;
      position: absolute;
      line-height: 50px;
      top: 0;
      right: 25px;
      cursor: pointer;
    }
  }
</style>
