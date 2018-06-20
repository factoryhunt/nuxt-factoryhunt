<template>
  <main>
    <div class="main-wrapper">
      <div class="form-container">
        <form @submit.prevent="onSubmitButton()">

          <div>
            <!-- Title of Form -->
            <h3>Complete Your Request</h3>

            <!-- Title of Buying Lead -->
            <section>
              <label
                for="title-input">Title<required-icon/></label>
              <text-input
                id="title-input"
                class="input"
                v-model="value.title"
                pattern="[A-Za-z0-9 ]{2,50}"
                :maxlength="50"
                :maxlengthDisplay="true"/>
            </section>

            <!-- Category -->
            <section>
              <label 
                for="category-input">Category<required-icon/></label>
                <search-input
                  class="input"
                  v-model="value.category"
                  :array="getCategories"
                  :maxlength="100"/>
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
                  v-model="value.quantity"
                  placeholder="E.g 10000"/>
                <select-input
                  id="unit"
                  class="input input-select"
                  v-model="value.unit"
                  :array="units"/>
              </div>
            </section>

            <!-- Description -->
            <section id="description-section">
              <label for="description-input">Description<required-icon/></label>
              <text-area
                id="description-input"
                class="input"
                :rows="11"
                v-model="value.description"
                :maxlength="1000"
                :maxlengthDisplay="true"/>
            </section>

            <!-- Dropzone -->
            <section id="dropzone-section">
              <label>Attachments</label>
              <dropzone
                id="dropzone"
                class="input"
                :maxFileLength="5"
                :maxFileSize="2"
                allowFileTypes="\/(png|jpeg|jpg)$"
                @fileChanged="onDropzoneFileAdded"
                @onError="onDropzoneError"/>
              <span 
                class="label">PNG, JPEG, JPG Only. You can upload up to 5, and maxmimum file size is 2MB each.</span>
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
                  v-model="value.deliveryTerm"
                  :array="deliveryTerms"/>
              </section>

              <!-- Payment Type -->
              <section 
                class="section-half section-half__right">
                <label for="">Payment Type</label>
                <select-input
                  class="input"
                  id="payment-type"
                  v-model="value.paymentType"
                  :array="paymentTypes"/>
              </section>
            </div>

            <div class="section-divider">
              <!-- Destination Port -->
              <section 
                class="section-half section-half__left">
                <label for="">Destination Port</label>
                <text-input
                  class="input"
                  v-model="value.destinationPort"
                  placeholder="E.g Port of Los Angeles"/>
              </section>

              <!-- Preffered Unit Price -->
              <section 
                class="section-half section-half__right">
                <label for="">Preferred Unit Price</label>
                <div class="section-divider">
                  <text-input
                    id="quantity"
                    class="input input-text"
                    v-model="value.preferredUnitPrice"
                    placeholder="E.g 10000"/>
                  <select-input
                    id="unit"
                    class="input input-select"
                    v-model="value.preferredUnitPriceCurrency"
                    :array="paymentCurrentcies"/>
                </div>
              </section>
            </div>
          </div>

          <!-- Paid Request -->
          <!-- <div></div> -->

          <div class="section-container">
            <h3>Confirm and Submit<required-icon/></h3>

            <!-- Agreements -->
            <section
              id="agreement-section">
              <checkbox 
                id="business-card"
                label="I agree to share my contact details with selected suppliers."
                v-model="value.businessCard"/>
              <!-- <checkbox 
                id="terms"
                label="I agree to our Terms and that you have read our Privacy Policy."
                v-model="value.terms"/> -->
            </section>

            <!-- Submit -->
            <section
              id="submit-section">
              <submit-button
                id="submit-button"
                role="submit"
                :disabled="!isButtonActive"
                :isLoading="isSubmiting">
                {{getSubmitButtonLabel}}
              </submit-button>
              <a 
                id="later-button"
                v-show="!isActivated"
                @click="onSaveDraft()">Save Draft</a>
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
import { mapGetters } from 'vuex'
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
  props: ['value', 'isSubmiting'],
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
    ...mapGetters({
      user: 'auth/GET_USER'
    }),
    getContactId() {
      return this.user.contact.contact_id
    },
    getCategories() {
      return this.categories
    },
    isActivated() {
      return this.value.status === 'Activated'
    },
    getSubmitButtonLabel() {
      return this.isActivated ? 'Edit Request' : 'Sumbit Request'
    }
  },
  methods: {
    onDropzoneFileAdded(files) {
      this.$emit('fileAdded', files)
    },
    onDropzoneError(err) {
      console.log('dropzone error:\n', err)
    },
    onSubmitButton() {
      this.$emit('submit')
    },
    onSaveDraft() {
      this.$emit('saveDraft')
    }
  },
  updated() {
    this.$emit('changed')
    const { title, category, description, businessCard } = this.value

    if (title && description && category && businessCard) this.isButtonActive = true
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

#dropzone-section {
  .label {
    color: @color-font-gray;
    font-size: 14px;
    margin-top: 4px;
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