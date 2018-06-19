<template>
  <modal 
    :isHidden="isHidden"
    @close="$emit('close')">
    <card 
      :title="title"
      @close="$emit('close')">
      <div class="wrapper">
        <slot></slot>
        <div class="footer">
          <button 
            class="button cancel"
            @click="$emit('close')">
            No
          </button>
          <button 
            class="button confirm"
            @click="$emit('confirm')">
            Yes
          </button>
        </div>
      </div>
    </card>
  </modal>
</template>

<script>
import Modal from '~/components/Modal/Container'
import Card from '~/components/Card/Modal'
import SubmitButton from '~/components/Button'
export default {
  components: {
    Modal,
    Card,
    SubmitButton
  },
  props: {
    isHidden: null,
    title: {
      type: String,
      default: 'Confirm'
    }
  },
  methods: {
    init() {
      this.addEventListeners()
    },
    addEventListeners() {
      document.addEventListener('keypress', ({ keyCode }) => {
        if (keyCode === 13) this.$emit('confirm')
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';

.modal-background {
  display: block;
}

.wrapper {
  font-size: 20px;
}
.footer {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
.button {
  padding: 11px 32px;
  border: 0;
  border-radius: @border-radius;
  font-size: 18px;
  font-weight: 500;
  margin-left: 12px;
}
.confirm {
  background-color: @color-orange;
  color: @color-white;
}
.cancel {
  background-color: @color-white;
  border: 1px solid @color-deep-gray;
}
</style>
