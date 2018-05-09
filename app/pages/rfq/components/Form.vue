<template>
  <main>
    <div class="main-wrapper">
      <div class="form-container">
        <form @submit.prevent="onSubmitButton()">
          <!-- Title of Form -->
          <h3 class="form__title">Tell Suppliers What You Looking for</h3>

          <!-- Form Input -->
          <div class="input-wrapper">

            <!-- Title of Buying Lead -->
            <section class="title-section">
              <label
                for="title-input">Title</label>
              <text-input
                id="title-input"
                class="input"
                :value="value.title"
                placeholder="E.g "
                @input="onTitleUpdated"/>
            </section>

            <!-- Category -->
            <section>
              <label 
                for="category-input">Category</label>
              <category-input
                id="category-input"
                class="input"/>
            </section>

            <!-- Description -->
            <section id="description-section">
              <label for="description-input">What you need</label>
              <text-area
                id="description-input"
                class="input"
                :value="value.description"
                @input="onDescriptionUpdated"/>
            </section>
            <!-- Quantity & Unit -->

            <!-- Trade Capacity -->

            <!-- Paid Request -->

            <!-- Agreements -->
            <section
              id="agreement-section">
              <checkbox label="I agree to share my Business Card with quoted suppliers."/>
              <checkbox label="I have read, understood and agreed to abide by Terms and Conditions Governing RFQ"/>
            </section>

            <!-- Submit -->
            <section
              id="submit-section">
              <button 
                id="submit-button"
                role="submit"
                class="button-orange">Sumbit Requetion</button>
            </section>

          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
// components
import TextInput from '~/components/Inputs/Text'
import CategoryInput from '~/components/Inputs/Category'
import TextArea from '~/components/Inputs/Textarea'
import Checkbox from '~/components/Inputs/Checkbox'
export default {
  props: ['value'],
  components: {
    TextInput,
    CategoryInput,
    TextArea,
    Checkbox
  },
  methods: {
    onTitleUpdated(value) {
      this.$emit('input', { title: value })
    },
    onDescriptionUpdated(value) {
      this.$emit('input', { description: value })
    },
    onSubmitButton() {
      this.$emit('onSubmitButton')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/rfq/index';

main {
  flex: 1;
}

.form-container {
  .gray-border;
  background-color: @color-bg-gray;
  padding: 40px;
}
.form__title {
  font-weight: 400;
}
.input-wrapper {
  margin-top: 40px;
}

section {
  margin-top: 20px;
  font-size: 18px;

  label {
    font-weight: 500;
  }
  .input {
    margin-top: 8px;
  }
}
#agreement-section {
  margin-top: 40px;
  font-size: 14px;
}
#submit-section {
  button {
    font-size: 18px;
    font-weight: 600;
  }
}

.right-container {
  flex: 1;
  margin-left: 20px;
}
</style>