<template>
  <div class="select-container">
    <!-- Select -->
    <div 
      class="input-container"
      ref="inputContainer"
      @click="onSelectClick()">
      <span>Select</span>
    </div>
    <!-- Options -->
    <div 
      class="option-container"
      v-show="isVisible">
      <div class="option-wrapper">
        <!-- Step1 -->
        <ul v-show="step1.length">
          <li 
            class="option"
            v-for="category in step1" 
            :key="category.id"
            @click="onStep1(category)">{{category.name}}</li>
        </ul>
        <!-- Step2 -->
        <ul v-show="step2.length">
          <li 
            class="option"
            v-for="category in step2" 
            :key="category.id"
            @click="onStep2(category)">{{category.name}}</li>
        </ul>
        <!-- Step3 -->
        <ul v-show="step3.length">
          <li 
            class="option"
            v-for="category in step3" 
            :key="category.id"
            @click="onStep3(category)">{{category.name}}</li>
        </ul>
        <!-- Step4 -->
        <ul v-show="step4.length">
          <li 
            class="option"
            v-for="category in step4" 
            :key="category.id"
            @click="onStep4(category)">{{category.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// models
import categories from '~/assets/models/category.json'
export default {
  data: () => ({
    categories,
    isVisible: false,
    step1: [],
    step2: [],
    step3: [],
    step4: []
  }),
  computed: {
    getStep1() {
      const regExr = /0{6}$/
      const step1 = this.categories.filter(category => {
        const id = category.id
        return regExr.test(id)
      })
      return step1
    }
  },
  methods: {
    onSelectClick(target) {
      this.isVisible = !this.isVisible
    },
    onStep1(step1) {
      this.step3 = []
      this.step4 = []

      this.step2 = this.getStep2(step1)
    },
    onStep2(step2) {
      this.step3 = []
      this.step4 = []

      this.step3 = this.getStep3(step2)
    },
    onStep3(step3) {
      this.step4 = []

      this.step4 = this.getStep4(step3)
    },
    onStep4(step4) {
      console.log(step4.id, step4.name)
    },
    getStep2(step1) {
      const step1Name = step1.name
      const step1Code = step1.id.substring(0, 2)
      const step1Tail = step1.id.substring(4, 8)

      const step2 = this.categories.filter(category => {
        const name = category.name
        const code = category.id.substring(0, 2)
        const tail = category.id.substring(4, 8)
        return step1Code === code && step1Tail === tail && step1Name !== name
      })

      return step2
    },
    getStep3(step2) {
      const step2Name = step2.name
      const step2Code = step2.id.substring(0, 4)
      const step2Tail = step2.id.substring(6, 8)

      const step3 = this.categories.filter(category => {
        const name = category.name
        const code = category.id.substring(0, 4)
        const tail = category.id.substring(6, 8)

        return step2Code === code && step2Tail === tail && step2Name !== name
      })

      return step3
    },
    getStep4(step3) {
      const step3Name = step3.name
      const step3Code = step3.id.substring(0, 6)

      const step4 = this.categories.filter(category => {
        const name = category.name
        const code = category.id.substring(0, 6)
        return step3Code === code && step3Name !== name
      })

      return step4
    }
  },
  watch: {
    isVisible: function(bool) {
      const $inputContainer = this.$refs.inputContainer

      bool
        ? $inputContainer.classList.add('focus')
        : $inputContainer.classList.remove('focus')
    }
  },
  mounted() {
    this.step1 = this.getStep1
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

.select-container {
  position: relative;
}

.input-container {
  border: 1px solid @color-light-grey;
  border-radius: @border-radius;
  display: block;
  width: 100%;
  background-color: @color-white;
  padding: 11px;
  transition: border-color linear 0.2s;

  &.focus {
    border-color: @color-link;
  }

  span {
    display: block;
    background-image: url(~assets/icons/arrow-angle-down.png);
    background-size: 14px;
    background-position: 99% 50%;
    background-repeat: no-repeat;
  }
}

.option-container {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2;
}
.option-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
ul {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: scroll;
  width: 250px;
  max-height: 290px;
  height: 100%;
  box-shadow: 2px 2px 4px @color-light-grey;
  border-right: 1px solid @color-light-gray;
  border-radius: @border-radius;
}
.option {
  padding: 8px 10px;
  background-color: @color-white;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background-color: @color-lightest-grey;
  }
}
</style>
