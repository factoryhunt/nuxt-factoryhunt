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
                placeholder="E.g "
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
            <section id="preffered-unit-price-section">
              <label for="">Quantity</label>
              <div class="section-divider">
                <text-input
                  id="quantity"
                  class="input"
                  :value="value.title"
                  placeholder="E.g 10000"
                  @input="onTitleUpdated"/>
                <select-input
                  id="unit"
                  class="input"
                  :array="units"/>
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
          </div>

          <!-- Other Requirements -->
          <div class="section-container">
            <h3>Other Requirements</h3>

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

            <!-- Quantity & Unit -->
            <section id="preffered-unit-price-section">
              <label for="">Preferred Unit Price</label>
              <div class="section-divider">
                <text-input
                  id="quantity"
                  class="input"
                  :value="value.title"
                  placeholder="E.g 10000"
                  @input="onTitleUpdated"/>
                <select-input
                  id="unit"
                  class="input"
                  :array="units"/>
              </div>
            </section>

            <!-- Delivery Terms -->
            <div class="section-divider">
              <section id="delivery-terms-section">
                <label for="">Delivery Term</label>
                <select-input
                  class="input"
                  :array="deliveryTerms"/>
              </section>

              <!-- Payment Type -->
              <section id="payment-type-section">
                <label for="">Payment Type</label>
                <select-input
                  class="input"
                  id="payment-type"
                  :array="paymentTypes"/>
              </section>
            </div>

            <!-- Destination Port -->
            <section id="destination-port-section">
              <label for="">Destination Port</label>
              <text-input
                class="input"
                :value="value.title"
                placeholder="E.g Busan"
                @input="onTitleUpdated"/>
            </section>

          </div>

          <!-- Paid Request -->

          <div class="section-container">
            <h3>Confirm and Submit</h3>

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
import RequiredIcon from '~/components/Icons/Required'
import Dropzone from '~/components/Dropzone/Test'
import TextInput from '~/components/Inputs/Text'
import CategoryInput from '~/components/Inputs/Category'
import TextArea from '~/components/Inputs/Textarea'
import SelectInput from '~/components/Inputs/Select'
import Checkbox from '~/components/Inputs/Checkbox'
export default {
  props: ['user', 'value', 'units', 'deliveryTerms', 'paymentTypes'],
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
    onSubmitButton() {
      this.$emit('onSubmitButton')
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

  #delivery-terms-section {
    flex: 1;
    margin-right: 10px;
  }
  #payment-type-section {
    flex: 1;
    margin-left: 10px;
  }

  #quantity {
    flex: 2;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  #unit {
    flex: 1;
  }
}

#agreement-section {
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