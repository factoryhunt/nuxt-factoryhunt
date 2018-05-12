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
                :value="value.title"
                placeholder="E.g I'm looking for some product"
                @input="onTitleUpdated"/>
            </section>

            <!-- Category -->
            <section>
              <label 
                for="category-input">Category<required-icon/></label>
              <category-input
                id="category-input"
                class="input"/>
            </section>

            <!-- Quantity & Unit -->
            <section id="quantity-unit-section">
              <label for="">Quantity</label>
              <div class="section-divider">
                <text-input
                  class="input input-text"
                  :value="value.quantity"
                  placeholder="E.g 10000"
                  @input="onQuantityUpdated"/>
                <select-input
                  id="unit"
                  class="input input-select"
                  :value="value.unit"
                  :array="units"
                  @input="onUnitUpdated"/>
              </div>
            </section>

            <!-- Description -->
            <section id="description-section">
              <label for="description-input">What you need<required-icon/></label>
              <text-area
                id="description-input"
                class="input"
                :rows="11"
                :value="value.description"
                @input="onDescriptionUpdated"/>
            </section>

            <!-- Dropzone -->
            <section id="dropzone-section">
              <label>Images</label>
              <dropzone
                id="dropzone"
                class="input"
                :maxFileLength="5"
                :maxFileSize="1"
                imageWidth="240px"
                :s3="getS3Config"/>
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
                  :value="value.deliveryTerm"
                  :array="deliveryTerms"
                  @input="onDeliveryTermUpdated"/>
              </section>

              <!-- Payment Type -->
              <section 
                class="section-half section-half__right">
                <label for="">Payment Type</label>
                <select-input
                  class="input"
                  id="payment-type"
                  :value="value.paymentType"
                  :array="paymentTypes"
                  @input="onPaymentTypeUpdated"/>
              </section>
            </div>

            <div class="section-divider">
              <!-- Destination Port -->
              <section 
                class="section-half section-half__left">
                <label for="">Destination Port</label>
                <text-input
                  class="input"
                  :value="value.destinationPort"
                  placeholder="E.g Busan"
                  @input="onDestinationPortUpdated"/>
              </section>

              <!-- Preffered Unit Price -->
              <section 
                class="section-half section-half__right">
                <label for="">Preferred Unit Price</label>
                <div class="section-divider">
                  <text-input
                    id="quantity"
                    class="input input-text"
                    :value="value.preferredUnitPrice"
                    placeholder="E.g 10000"
                    @input="onPreferredUnitPirceUpdated"/>
                  <select-input
                    id="unit"
                    class="input input-select"
                    :value="value.preferredUnitPriceCurrency"
                    :array="paymentCurrentcies"
                    @input="onPreferredUnitPirceCurrencyUpdated"/>
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
                :checked="value.businessCard"
                @change="onBusinessCardUpdated"/>
              <checkbox 
                id="terms"
                label="I have read, understood and agreed to abide by Terms and Conditions Governing RFQ"
                :checked="value.terms"
                @change="onTermsUpdated"/>
            </section>

            <!-- Submit -->
            <section
              id="submit-section">
              <button 
                id="submit-button"
                role="submit"
                class="button-orange">Sumbit Requetion</button>
              <a 
                id="later-button"
                @click="onSaveForLaterButton()">Save for Later</a>
            </section>
          </div>

        </form>
      </div>
    </div>
  </main>
</template>

<script>
// components
import RequiredIcon from '~/components/Icons/Required'
import Dropzone from '~/components/Dropzone/Test'
import TextInput from '~/components/Inputs/Text'
import CategoryInput from '~/components/Inputs/Category'
import TextArea from '~/components/Inputs/Textarea'
import SelectInput from '~/components/Inputs/Select'
import Checkbox from '~/components/Inputs/Checkbox'
export default {
  props: [
    'user',
    'value',
    'units',
    'deliveryTerms',
    'paymentTypes',
    'paymentCurrentcies'
  ],
  components: {
    RequiredIcon,
    Dropzone,
    TextInput,
    CategoryInput,
    TextArea,
    SelectInput,
    Checkbox
  },
  computed: {
    getContactId() {
      return this.user.contact.contact_id
    },
    getS3Config() {
      return {
        mysql_table: 'buying_leads',
        fieldname: 'rfq_image',
        api_url: `/api/data/documents/${this.getContactId}`
      }
    }
  },
  methods: {
    onTitleUpdated(value) {
      this.$emit('input', { title: value })
    },
    onDescriptionUpdated(value) {
      this.$emit('input', { description: value })
    },
    onCategoryUpdated(value) {
      this.$emit('input', { category: value })
    },
    onQuantityUpdated(value) {
      this.$emit('input', { quantity: value })
    },
    onUnitUpdated(value) {
      this.$emit('input', { unit: value })
    },
    onDeliveryTermUpdated(value) {
      this.$emit('input', { deliveryTerm: value })
    },
    onPaymentTypeUpdated(value) {
      this.$emit('input', { paymentType: value })
    },
    onDestinationPortUpdated(value) {
      this.$emit('input', { destinationPort: value })
    },
    onPreferredUnitPirceUpdated(value) {
      this.$emit('input', { preferredUnitPrice: value })
    },
    onPreferredUnitPirceCurrencyUpdated(value) {
      this.$emit('input', { preferredUnitPriceCurrency: value })
    },
    onBusinessCardUpdated(value) {
      console.log('business Card', value)
      this.$emit('input', { businessCard: value })
    },
    onTermsUpdated(value) {
      console.log('terms', value)
      this.$emit('input', { terms: value })
    },
    onSubmitButton() {
      this.$emit('onSubmitButton', { status: 'activated' })
    },
    onSaveForLaterButton() {
      this.$emit('onSubmitButton', { status: 'draft' })
    }
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