<template>
  <main>
    <div class="main-wrapper">
      <div class="form-container">
        <form @submit.prevent="onSubmitButton()">

          <div>
            <!-- Title of Form -->
            <h3>Complete Your RFQ</h3>

            <!-- Title of Buying Lead -->
            <section>
              <label
                for="title-input">Title<required-icon/></label>
              <text-input
                id="title-input"
                class="input"
                dataKey="title"
                :value="value.title"
                placeholder="E.g I'm looking for some product"
                :maxlength="50"
                :maxlengthDisplay="true"
                @input="onInput"
                @change="onInputChange"/>
            </section>

            <!-- Category -->
            <section>
              <label 
                for="category-input">Category<required-icon/></label>
                <search-input
                  class="input"
                  dataKey="category"
                  placeholder="E.g Steel"
                  :value="category"
                  :array="getCategories"
                  :maxlength="100"
                  @input="onCategoryInput"
                  @change="onInputChange"/>
              <div class="category-selected-container">
                <div 
                  class="selected"
                  v-show="value.category">Selected: {{value.category}}</div>
                <div class="expand">
                  
                </div>
              </div>
            </section>

            <!-- Quantity & Unit -->
            <section id="quantity-unit-section">
              <label for="">Quantity</label>
              <div class="section-divider">
                <text-input
                  class="input input-text"
                  dataKey="quantity"
                  :value="value.quantity"
                  placeholder="E.g 10000"
                  @input="onInput"
                  @change="onInputChange"/>
                <select-input
                  id="unit"
                  class="input input-select"
                  dataKey="unit"
                  :value="value.unit"
                  :array="units"
                  @change="onInputChange"/>
              </div>
            </section>

            <!-- Description -->
            <section id="description-section">
              <label for="description-input">What you need<required-icon/></label>
              <text-area
                id="description-input"
                class="input"
                :rows="11"
                dataKey="description"
                :value="value.description"
                :maxlength="1000"
                :maxlengthDisplay="true"
                @input="onInput"
                @change="onInputChange"/>
            </section>

            <!-- Dropzone -->
            <section id="dropzone-section">
              <label>Images</label>
              <dropzone
                id="dropzone"
                class="input"
                :maxFileLength="5"
                :maxFileSize="10"
                @fileChanged="onDropzoneFileAdded"
                @onError="onDropzoneError"/>
            </section>
          </div>

          <!-- Other Requirements -->
          <div class="section-container">
            <h3>Other Requirements</h3>

            <!-- Delivery Terms -->
            <div class="section-divider">
              <section 
                class="section-half section-half__left">
                <label for="">Delivery Term</label>
                <select-input
                  class="input"
                  dataKey="deliveryTerm"
                  :value="value.deliveryTerm"
                  :array="deliveryTerms"
                  @change="onInputChange"/>
              </section>

              <!-- Payment Type -->
              <section 
                class="section-half section-half__right">
                <label for="">Payment Type</label>
                <select-input
                  class="input"
                  id="payment-type"
                  dataKey="paymentType"
                  :value="value.paymentType"
                  :array="paymentTypes"
                  @change="onInputChange"/>
              </section>
            </div>

            <div class="section-divider">
              <!-- Destination Port -->
              <section 
                class="section-half section-half__left">
                <label for="">Destination Port</label>
                <text-input
                  class="input"
                  dataKey="destinationPort"
                  :value="value.destinationPort"
                  placeholder="E.g Busan"
                  @input="onInput"
                  @change="onInputChange"/>
              </section>

              <!-- Preffered Unit Price -->
              <section 
                class="section-half section-half__right">
                <label for="">Preferred Unit Price</label>
                <div class="section-divider">
                  <text-input
                    id="quantity"
                    class="input input-text"
                    dataKey="preferredUnitPrice"
                    :value="value.preferredUnitPrice"
                    placeholder="E.g 10000"
                    @input="onInput"
                    @change="onInputChange"/>
                  <select-input
                    id="unit"
                    class="input input-select"
                    dataKey="preferredUnitPriceCurrency"
                    :value="value.preferredUnitPriceCurrency"
                    :array="paymentCurrentcies"
                    @change="onInputChange"/>
                </div>
              </section>
            </div>
          </div>

          <!-- Paid Request -->
          <!-- <div></div> -->

          <div class="section-container">
            <h3>Confirm and Submit</h3>

            <!-- Agreements -->
            <section
              id="agreement-section">
              <checkbox 
                id="business-card"
                label="I agree to share my Business Card with quoted suppliers."
                dataKey="businessCard"
                :checked="value.businessCard"
                @change="onInputChange"/>
              <checkbox 
                id="terms"
                label="I have read, understood and agreed to abide by Terms and Conditions Governing RFQ"
                dataKey="terms"
                :checked="value.terms"
                @change="onInputChange"/>
            </section>

            <!-- Submit -->
            <section
              id="submit-section">
              <submit-button
                id="submit-button"
                role="submit"
                :disabled="!isButtonActive"
                :isLoading="isSubmiting">
                Submit Requestion
              </submit-button>
              <a 
                id="later-button"
                @click="onSaveForLaterButton()">Save Draft</a>
            </section>
          </div>

        </form>
      </div>
    </div>
  </main>
</template>

<script>
// components
import SearchInput from '~/components/Inputs/Search'
import TextInput from '~/components/Inputs/Text'
import RequiredIcon from '~/components/Icons/Required'
import Dropzone from '~/components/Dropzone/Test'
import CategoryInput from '~/components/Inputs/Category'
import TextArea from '~/components/Inputs/Textarea'
import SelectInput from '~/components/Inputs/Select'
import Checkbox from '~/components/Inputs/Checkbox'
import SubmitButton from '~/components/Button'
// models
import categories from '~/assets/models/category.json'
import units from '~/assets/models/units.json'
import delivery_terms from '~/assets/models/delivery_terms.json'
import payment_types from '~/assets/models/payment_type.json'
import payment_currentcies from '~/assets/models/payment_currentcies.json'
export default {
  components: {
    SearchInput,
    TextInput,
    RequiredIcon,
    Dropzone,
    CategoryInput,
    TextArea,
    SelectInput,
    Checkbox,
    SubmitButton
  },
  props: ['user', 'value', 'isSubmiting'],
  data: () => ({
    categories: categories,
    units: units,
    deliveryTerms: delivery_terms,
    paymentTypes: payment_types,
    paymentCurrentcies: payment_currentcies,
    isButtonActive: false,
    isFileUploading: false,
    category: ''
  }),
  computed: {
    getContactId() {
      return this.user.contact.contact_id
    },
    getCategories() {
      return this.categories
    }
  },
  methods: {
    onInput(data) {
      this.$emit('input', data)
    },
    onInputChange(value) {
      this.$emit('change', value)
    },
    onCategoryInput(data) {
      this.category = data.value
    },
    onDropzoneFileAdded(files) {
      this.$emit('fileAdded', files)
    },
    onDropzoneError(err) {
      console.log('dropzone error:\n', err)
    },
    onSubmitButton() {
      this.$emit('onSubmitButton', { status: 'activated' })
    },
    onSaveForLaterButton() {
      this.$emit('onSubmitButton', { status: 'draft' })
    }
  },
  updated() {
    const { title, description, businessCard, terms } = this.value

    if (title && description && businessCard && terms) this.isButtonActive = true
    else this.isButtonActive = false
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/rfq/index';

@section-margin: 40px;

main {
  flex: 1;
}

.section-container {
  margin-top: @section-margin;
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
.section-divider {
  display: flex;
  align-items: center;

  .section-half {
    flex: 1;
  }
  .section-half__left {
    margin-right: 10px;
  }
  .section-half__right {
    margin-left: 10px;
  }

  .input-text {
    flex: 5;
  }
  .input-select {
    flex: 3;
  }
}

.category-selected-container {
  margin-top: 8px;

  .selected {
    font-size: 15px;
  }
}

#unit {
  max-width: 205px;
}

#agreement-section {
  font-size: 14px;
}
#submit-section {
  button {
    font-size: 18px;
    font-weight: 600;
  }
  #submit-button {
    min-width: 222px;
  }
  #later-button {
    padding: 14px 28px;
    color: @color-orange;
  }
}

.right-container {
  flex: 1;
  margin-left: @section-margin;
}
</style>