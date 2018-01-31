<template>
  <div class="dashboard-page-container">

    <spinkit id="loader"></spinkit>

    <form @submit.prevent="onEditButton">
      <div class="body-container">

        <!-- Title -->
        <p class="title" v-lang.header.title></p>
        <p class="sub-title" v-lang.header.subTitle></p>

        <div class="input-container">
          <!-- Email -->
          <div class="box-container" style="background-color: #eeeeee">
            <div class="left-contents" v-lang.body.email.title></div>
            <div class="right-contents"><input disabled type="email" v-model="value.email"></div>
          </div>

          <!-- First name -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.firstName.title></div>
            <div class="right-contents"><input type="text" pattern="[A-Za-z -.]{1,20}" :placeholder="getFirstNamePlaceholder" :title="getFirstNameInputTitle" v-model="value.firstName"></div>
          </div>
          <!-- Last name -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.lastName.title></div>
            <div class="right-contents"><input type="text" pattern="[A-Za-z]{1,20}" :placeholder="getLastNamePlaceholder" :title="getLastNameInputTitle" v-model="value.lastName"></div>
          </div>

          <!-- Title -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.titles.title></div>
            <div class="right-contents"><input type="text" pattern="[A-Za-z ,]{1,30}" :placeholder="getTitlesPlaceholder" :title="getTitlesInputTitle" v-model="value.title"></div>
          </div>

          <!-- Mobile -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.mobile.title></div>
            <div class="right-contents"><input type="text" pattern="[0-9+-]{1,21}" :placeholder="getMobilePlaceholder" :title="getMobileInputTitle" v-model="value.mobile"></div>
          </div>

          <!-- Phone -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.officeNumber.title></div>
            <div class="right-contents"><input type="text" pattern="[0-9+-]{1,21}" :placeholder="getOfficeNumberPlaceholder" :title="getOfficeNumberInputTitle" v-model="value.phone"></div>
          </div>
        </div>

        <!-- Confirm -->
        <div class="confirm-container input-container">
          <p class="title" v-lang.confirm.title></p>
          <p class="sub-title" v-lang.confirm.subTitle></p>
          <button class="button-orange" v-lang.confirm.button></button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import $ from 'jquery'
  import Spinkit from '~/components/Loader'
  export default {
    metaInfo: {
      title: 'Edit Information | Factory Hunt'
    },
    components: {
      Spinkit
    },
    props: {
      contact: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          email: '',
          firstName: '',
          firstNameEnglish: '',
          lastName: '',
          lastNameEnglish: '',
          salutation: '',
          title: '',
          languages: '',
          phone: '',
          mobile: '',
          type: ''
        }
      }
    },
    messages: {
      eng: {
        editSuccess: 'Your information has been edited.',
        editFail: 'Edit failed. Please try again.',
        header: {
          title: 'Account Information',
          subTitle: 'Please upload all information below. It will make easier for buyers to contact you.'
        },
        body: {
          email: {
            title: 'Email'
          },
          firstName: {
            title: 'First Name',
            placeholder: 'Robert',
            inputTitle: 'It must be 1-20 characters and can only contain letters, hyphens and periods.'
          },
          lastName: {
            title: 'Last Name',
            placeholder: 'Smith',
            inputTitle: 'It must be 1-20 characters and can only contain letters.'
          },
          titles: {
            title: 'Title',
            placeholder: 'CEO, Manager, ..',
            inputTitle: 'It must be 1-30 characters and can only contain letters, and comma.'
          },
          mobile: {
            title: 'Mobile Number',
            placeholder: '+1-917-1234-5678',
            inputTitle: 'It must be 1-21 characters and can only contain numbers, plus, and hyphens.'
          },
          officeNumber: {
            title: 'Office Phone',
            placeholder: '+1-917-123-4567',
            inputTitle: 'It must be 1-21 characters and can only contain numbers, plus, and hyphens.'
          }
        },
        confirm: {
          title: 'Confirm and Save',
          subTitle: 'Please confirm the information above before you save it. All information will be updated immediately.',
          button: 'Save'
        },
        alert: {
          success: 'Your information has been updated successfully.',
          fail: 'Information update failed. Please try again.'
        }
      },
      kor: {
        editSuccess: '정보가 업데이트 되었습니다.',
        editFail: '정보 수정 실패. 다시 시도해주세요.',
        header: {
          title: '정보 입력하기',
          subTitle: '모든 정보를 입력하면 바이어가 회원님을 찾는게 좀 더 수월해집니다.'
        },
        body: {
          email: {
            title: '이메일'
          },
          firstName: {
            title: '이름',
            placeholder: 'Robert',
            inputTitle: '1~20자의 문자, 하이픈(-), 그리고 마침표만 입력해주세요.'
          },
          lastName: {
            title: '성',
            placeholder: 'Smith',
            inputTitle: '1~20자의 이상의 문자만 입력해주세요.'
          },
          titles: {
            title: '직책',
            placeholder: 'CEO, Manager, ..',
            inputTitle: '1~30자의 문자와 마침표(.)만 입력해주세요.'
          },
          mobile: {
            title: '핸드폰 번호',
            placeholder: '+82-10-1234-5678',
            inputTitle: '1~21자의 숫자, 더하기, 그리고 하이픈(-)만 입력해주세요.'
          },
          officeNumber: {
            title: '사무실 번호',
            placeholder: '+82-10-123-4567',
            inputTitle: '1~21자의 숫자, 더하기, 그리고 하이픈(-)만 입력해주세요.'
          }
        },
        confirm: {
          title: '확인 및 수정',
          subTitle: '수정 할 정보를 다시 한 번 확인하고 내용이 맞다면 수정 버튼을 눌러주세요. 웹사이트에 바로 반영됩니다.',
          button: '수정하기'
        },
        alert: {
          success: '정보가 성공적으로 업데이트 되었습니다.',
          fail: '정보를 업데이트 실패. 다시 시도해주세요.'
        }
      }
    },
    methods: {
      onEditButton () {
        $('#loader').removeClass().addClass('spinkit-modal')
        const data = {
          contact_email: this.value.email,
          first_name_english: this.value.firstName,
          last_name_english: this.value.lastName,
          contact_title: this.value.title,
          contact_phone: this.value.phone,
          contact_mobile: this.value.mobile
//          first_name_english: this.value.firstNameEnglish,
//          last_name_english: this.value.lastNameEnglish
//          languages: this.value.languages,
//          salutation: this.value.salutation
        }
        axios.put(`/api/data/contact/${this.contact.contact_id}`, {
          contact_data: data
        })
          .then(() => {
            this.onEditSuccess()
          })
          .catch(() => {
            this.onEditFail()
          })
      },
      showAlert (alertState, msg) {
        $(document).ready(() => {
          const $alert = $('#alert')
          this.$store.commit('alert/changeState', {
            alertState,
            msg
          })
          $alert.show()
          setTimeout(() => {
            $('.alert-container').hide()
          }, 6000)
        })
      },
      mappingData () {
        this.value.email = this.contact.contact_email
        this.value.firstName = this.contact.first_name_english
        this.value.lastName = this.contact.last_name_english
        this.value.title = this.contact.contact_title
        this.value.phone = this.contact.contact_phone
        this.value.mobile = this.contact.contact_mobile
      },
      preventEnterKeySubmit () {
        $('input').keydown(() => {
          if (event.keyCode === 13) {
            event.preventDefault()
          }
        })
      },
      activateJquery () {
        $(document).ready(() => {
          this.preventEnterKeySubmit()
        })
      },
      onEditSuccess () {
        $(document).ready(() => {
          window.scrollTo(0, 0)
          $('#loader').removeClass()
          this.showAlert(true, this.getSuccessAlert)
        })
      },
      onEditFail () {
        $(document).ready(() => {
          window.scrollTo(0, 0)
          $('#loader').removeClass()
          this.showAlert(false, this.getFailAlert)
        })
      }
    },
    mounted () {
      this.mappingData()
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  /* Global CSS */
  p {
    margin: 0;
  }

  @height: 50px;
  @mark-right-amount: 12px;
  @small-mark-right-amount: 18px;
  @mark-bottom-amount: 16px;
  @font-size-button: 22px;
  @font-weight-button: 600;

  .dashboard-page-container {
  }

  .input-container {
    margin-bottom: 40px;
  }

  .title {
    font-size: 30px;
    font-weight:600;
    margin-bottom:18px;
  }
  .sub-title {
    font-size: 20px;
    font-weight:300;
    margin-bottom: 4px;
  }
  .third-title {
    font-size: 15px;
    font-weight:600;
    margin-bottom: 4px;
  }
  input {
    width: 100%;
    height: @height;
    font-size: 20px !important;
    font-weight: 400;
    margin-bottom: 5px !important;

    &:focus,
    &:active,
    &:visited {
      -webkit-transition: all 500ms;
      -moz-transition: all 500ms;
      -ms-transition: all 500ms;
      -o-transition: all 500ms;
      transition: all 500ms;
      border: 1px solid @color-orange;
    }
  }
  label {
    .upload-label-basic;
    border: 1px solid @color-font-base;
    margin-top: 10px;
    font-size: @font-size-button;
    font-weight: @font-weight-button;
  }
  textarea {
    font-size: 20px !important;
    font-weight: 400 !important;

    &:focus,
    &:active,
    &:visited {
      -webkit-transition: all 500ms;
      -moz-transition: all 500ms;
      -ms-transition: all 500ms;
      -o-transition: all 500ms;
      transition: all 500ms;
      border: 1px solid @color-orange;
    }
  }
  select {
    font-size: 20px !important;
    font-weight: 400 !important;
    margin-bottom: 5px !important;
    height: @height !important;
  }
  button {
    font-size: @font-size-button;
    font-weight: @font-weight-button;
    border: 1px solid @color-orange;
  }

  .dashboard-page-container {
    position: relative;

    .header-container {
      margin-bottom:30px;

      .title {
        font-size:30px;
        font-weight: 600;
      }
    }

    .body-container {

      .confirm-container {
        .sub-title {
          margin-bottom: 20px;
        }
      }
    }

  }
</style>
