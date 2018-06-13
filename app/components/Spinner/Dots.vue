<template>
  <div ref="spinner" id="spinner">
    <div ref="dot" class="dot bounce1"></div>
    <div ref="dot" class="dot bounce2"></div>
    <div ref="dot" class="dot bounce3"></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#484848'
    },
    size: {
      type: String,
      default: '14px'
    },
    width: {
      type: String,
      default: ''
    }
  },
  methods: {
    setAttribute() {
      const { color, size, width } = this
      const $spinner = this.$refs.spinner
      const $bounces = $spinner.children

      if (width) $spinner.style.width = width

      for (let i = 0; i < $bounces.length; i++) {
        const $bounce = $bounces[i]

        $bounce.style.backgroundColor = color
        $bounce.style.width = size
        $bounce.style.height = size
      }
    }
  },
  mounted() {
    this.setAttribute()
  }
}
</script>

<style>
#spinner {
  margin: 0 auto;
  text-align: center;
}

#spinner > div {
  width: 14px;
  height: 14px;
  margin: 0 4px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

#spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

#spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
