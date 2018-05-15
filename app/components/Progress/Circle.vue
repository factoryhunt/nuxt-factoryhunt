<template>
  <div 
    :id="id"
    class="progress-container" v-show="isMounted">
    <svg 
      class="progress" 
      :width="size" 
      :height="size" 
      :viewBox="`0 0 120 120`">
      <circle class="progress__meter" cx="60" cy="60" r="54" :stroke-width="storkeWidth" />
      <circle class="progress__value" cx="60" cy="60" r="54" :stroke-width="storkeWidth" />
    </svg>
    <span 
      class="progress__number"
      ref="progressNumber">
      {{progress}}%
    </span>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    progress: {
      type: Number,
      default: 50
    },
    size: {
      type: Number,
      default: 120
    },
    radius: {
      type: Number,
      default: 54
    },
    storkColor: {
      type: String
    },
    storkeWidth: {
      type: Number,
      default: 8
    }
  },
  data: () => ({
    isMounted: false
  }),
  computed: {
    getCircumfercent() {
      return 2 * Math.PI * this.radius
    }
  },
  methods: {
    initProgressCircle() {
      const $progressValue = document.querySelector('.progress__value')
      const $progressNumber = document.querySelector('.progress__number')

      $progressValue.style.strokeDasharray = this.getCircumfercent

      // Stroke Color
      if (this.storkeColor) $progressValue.style.stroke = this.strokeColor

      // Line Height
      if (this.size) $progressNumber.style.lineHeight = `${this.size}px`

      this.isMounted = true
      this.onProgress($progressValue, this.progress)
    },
    onProgress(target, progress) {
      const value = progress / 100
      const dashoffset = this.getCircumfercent * (1 - value)

      if (this.storkeColor) $progressValue.style.stroke = this.strokeColor

      target.style.strokeDashoffset = dashoffset
    }
  },
  mounted() {
    this.initProgressCircle()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
.progress-container {
  // flex-direction: column;
  position: relative;
}

.progress {
  transform: rotate(-90deg);
}

.progress__meter,
.progress__value {
  fill: none;
}

.progress__meter {
  transition: all linear 0.2s;
  stroke: #e6e6e6;
}

.progress__value {
  transition: all linear 0.2s;
  stroke: @color-orange;
  stroke-linecap: round;
}

// Number
.progress__number {
  position: absolute;
  left: 0;
  top: 0;
  line-height: 120px;
  width: 100%;
  text-align: center;
  color: @color-font-gray;
  font-weight: 500;
  font-size: 15px;
}
</style>
