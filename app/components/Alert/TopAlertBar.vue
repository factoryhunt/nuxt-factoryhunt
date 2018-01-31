<template>
  <section id="alert" :class="alertState ? 'alert-container success' : 'alert-container fail'">
    <div>
      <h5 class="message" v-html="alertMsg"></h5>
    </div>
    <i @click="onHideButton" id="hide-button" class="fa fa-times" aria-hidden="true"></i>
  </section>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  export default {
    messages: {
      eng: {
        success: 'Your information has been updated successfully.'
      },
      kor: {
        success: '정보가 성공적으로 업데이트 되었습니다.'
      }
    },
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
      line-height: 50px;
      font-size: 1.6rem;
      font-weight: 400;
    }

    #hide-button {
      font-size: 2rem;
      font-weight: 100;
      position: absolute;
      line-height: 50px;
      top: 0;
      right: 25px;
      cursor: pointer;
    }
  }
</style>
