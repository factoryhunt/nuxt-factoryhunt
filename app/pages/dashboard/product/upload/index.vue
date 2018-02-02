<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-spinkit"></spinkit>

    <!-- Header -->
    <header class="header-container">
      <h1 class="title" >{{ $t('dashboardProductEdit.header.title') }}</h1>
    </header>

    <div class="divider"></div>

    <!-- Body -->
    <div class="body-container">
      <form @submit.prevent="onUploadButton">

        <!-- Category -->
        <div class="category-container input-container">
          <p class="title" >{{ $t('dashboardProductEdit.category.title') }}</p>
          <div class="category-inner-container">
            <!-- Primary -->
            <div class="primary-category-container">
              <ul>
                <li v-for="(primary, index) in value.categories" :key="index" @click="onPrimaryCategory(index, $event)">{{primary.name}}</li>
              </ul>
            </div>
            <!-- Secondary -->
            <div class="secondary-category-container">
              <ul>
                <li v-for="(secondary, i) in value.subCategories" :key="i" @click="onSecondaryCategory(i, $event)">{{secondary.name}}</li>
              </ul>
            </div>
          </div>
          <p v-if="value.primaryCategory" class="hidden-text">{{ $t('dashboardProductEdit.category.select', { category: getCategory }) }}</p>
          <p class="caution-text">{{ $t('dashboardProductEdit.category.caution') }}</p>
        </div>
        <div class="divider"></div>

        <!-- Product Name -->
        <div class="name-container input-container">
          <p class="title" >{{ $t('dashboardProductEdit.productName.title') }}</p>
          <span class="required-text" v-html="$t('dashboardProductEdit.requiredField')"></span>
          <input id="name-count-input" required pattern="[A-Za-z0-9 `\/.,&()-]{2,100}" :title="$t('dashboardProductEdit.productName.inputTitle')" minlength="2" maxlength="100" v-model="value.productName" @keyup="countNameLength" :placeholder="$t('dashboardProductEdit.productName.placeholder')" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
          <p class="count-text">{{ 100 - value.nameCount }}</p>
          <p class="hidden-text">{{ $t('dashboardProductEdit.productName.hidden') }}</p>
          <p class="caution-text">{{ $t('dashboardProductEdit.productName.caution') }}</p>
        </div>
        <div class="divider"></div>

        <!-- Product Image -->
        <div class="image-container input-container">
          <p class="title">{{ $t('dashboardProductEdit.productImage.title') }}</p>
          <span class="required-text" v-html="$t('dashboardProductEdit.requiredField')"></span>
          <p class="sub-title" >{{ $t('dashboardProductEdit.productImage.subTitle') }}</p>
          <div class="image-inner-container">
            <div class="image-each-container">
              <ul id="image-container-ul">
                <li id="image-edit" style="display: none;">
                  <img class="each-image" src="~assets/img/white-bg.png">
                  <label></label>
                  <input name="thumbnail_image" type="file" accept="image/*">
                </li>
                <li id="image-add">
                  <img class="each-image" src="~assets/img/white-bg.png">
                  <label for="thumbnail-image-add"><i class="fa fa-plus add-button" aria-hidden="true"></i></label>
                  <input id="thumbnail-image-add" name="thumbnail_image" @change="onImageAdded($event.target.name, $event.target.files)" type="file" multiple accept="image/*">
                </li>
              </ul>
            </div>
            <span id="thumbnail-text">{{ $t('dashboardProductEdit.productImage.mainImage') }}</span>
          </div>
          <p class="caution-text">{{ $t('dashboardProductEdit.productImage.caution') }}</p>
        </div>
        <div class="divider"></div>

        <!-- Product Information -->
        <div class="information-container input-container">
          <p class="title">{{ $t('dashboardProductEdit.information.title') }}</p>
          <p class="sub-title">{{ $t('dashboardProductEdit.information.subTitle') }}</p>

          <!--<div class="box-container">-->
          <!--<div class="left-container">Unit price</div>-->
          <!--<div class="right-container">-->
          <!--<input placeholder="Enter unit price" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">-->
          <!--</div>-->
          <!--</div>-->
          <div class="box-container">
            <div class="left-container">{{ $t('dashboardProductEdit.information.code') }}</div>
            <div class="right-container">
              <input placeholder="Factory_Hunt_A_01" maxlength="100" v-model="value.productCode" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">{{ $t('dashboardProductEdit.information.moq') }}</div>
            <div class="right-container">
              <input placeholder="100" maxlength="10" pattern="[0-9,]{1,11}" :title="$t('dashboardProductEdit.information.moqInputTitle')" v-model="value.moq" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">{{ $t('dashboardProductEdit.information.origin') }}</div>
            <div class="right-container">
              <!--<select required v-model="value.origin">-->
              <select v-model="value.origin">
                <option id="disabled-option" disabled value="">{{ $t('dashboardProductEdit.information.originPlaceholder') }}</option>
                <option v-for="(country,index) in value.country_list" :key="index" :value="country.country_name">{{country.country_name}}</option>
              </select>
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">{{ $t('dashboardProductEdit.information.size') }}</div>
            <div class="right-container">
              <input placeholder="100 x 100 x 100mm" maxlength="100" v-model="value.dimension" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">{{ $t('dashboardProductEdit.information.materials') }}</div>
            <div class="right-container">
              <input placeholder="Iron, wood, .." maxlength="100" pattern="[A-Za-z ,-]{1,100}" :title="$t('dashboardProductEdit.information.materialsInputTitle')" v-model="value.materialType" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <p class="caution-text">{{ $t('dashboardProductEdit.information.caution') }}</p>
        </div>
        <div class="divider"></div>

        <!-- Product Introduction -->
        <div class="description-container input-container">
          <p class="title">{{ $t('dashboardProductEdit.introduction.title') }}</p>
          <textarea name="" id="" cols="30" rows="10"></textarea>
          <spinkit id="editor-spinkit"></spinkit>
          <p class="caution-text">{{ $t('dashboardProductEdit.introduction.caution') }}</p>
        </div>
        <div class="divider"></div>

        <!-- Catalog -->
        <div class="catalog-container input-container">
          <p class="title">{{ $t('dashboardProductEdit.catalog.title') }}</p>
          <p class="sub-title">{{ $t('dashboardProductEdit.catalog.subTitle') }}</p>
          <label for="pdf-input">{{ $t('dashboardProductEdit.catalog.button') }}</label>
          <input name="catalog_pdf" id="pdf-input" type="file" accept="application/pdf" @change="onPDFchanged($event.target.files)">
          <div class="file-information-container">
            <p id="file-information-text">{{msg.pdfText}}</p>
            <a id="pdf-cancel-button" @click="onPDFcancel" >{{ $t('dashboardProductEdit.catalog.cancel') }}</a>
          </div>
        </div>
        <div class="divider"></div>

        <!-- Upload Button -->
        <div class="confirm-container input-container">
          <p class="title">{{ $t('dashboardProductEdit.confirm.title') }}</p>
          <p class="sub-title">{{ $t('dashboardProductEdit.confirm.subTitle') }}</p>
          <button class="button-orange">{{ $t('dashboardProductEdit.confirm.button') }}</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import $ from 'jquery'
  import country from '~/assets/models/country.json'
  import categories from '~/assets/models/categories.json'
  import Spinkit from '~/components/Loader'
  import { mapGetters } from 'vuex'
  const VueEditor = process.BROWSER_BUILD ? require('vue2-editor') : ''
  export default {
    metaInfo: {
      title: 'Upload Product | Factory Hunt'
    },
    components: {
      Spinkit,
      VueEditor,
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        customToolbar: [
          ['bold', 'italic', 'underline'],
          ['image'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'indent': '-1'}, {'indent': '+1'}],
          [{'header': [1, 2, 3, 4, false]}],
          [{'color': []}, {'background': []}],
          [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
          ['clean']
        ],
        toggle: {
          productName: true
        },
        value: {
          files: [],
          pdfFile: null,
          country_list: country,
          categories: categories,
          subCategories: '',
          thirdCategories: '',
          forthCategories: '',
          primaryCategory: '',
          secondaryCategory: '',
          productName: '',
          nameCount: 0,
          price: '',
          productCode: '',
          moq: '',
          origin: '',
          dimension: '',
          materialType: '',
          editor: ''
        },
        msg: {
          pdfText: ''
        }
      }
    },
    messages: {
      eng: {
        requiredField: '<i class="fa fa-circle" aria-hidden="true"></i> Required field',
        uploadSuccess: 'Your product has been uploaded.\nPlease allow up to 24 hours for product approval.',
        uploadFail: 'Product upload failed. please try again.',
        header: {
          title: 'Upload Product'
        },
        category: {
          title: 'Category',
          select: 'Selected category: {category}',
          caution: 'If you register in a category that does not match the product, your product may be forcibly moved, stopped listing, or prohibited from listing.'
        },
        productName: {
          title: 'Product Name',
          inputTitle: 'It must be 2~100 characters and can only contain letters, numbers, hyphens, slash, periods, parentheses, apostrophe and Ampersand.',
          placeholder: 'Please enter your product name.',
          caution: 'If keywords are not directly related to the registered product, the registration can be prohibited by the administrator.',
          hidden: 'You already have the same product name. Please try another one.'
        },
        productImage: {
          title: 'Product image',
          subTitle: 'The first photo will be the main product image. You can upload up to 5 images.',
          mainImage: 'Main image',
          caution: 'If images are not directly related to the registered product, the registration can be by the administrator.',
          alert: 'At least one product photo must be uploaded.'
        },
        information: {
          title: 'Product Information',
          subTitle: 'Please fill out the form correctly.',
          code: 'Product code',
          moq: 'MOQ',
          moqInputTitle: 'It must be 1~11 characters and can only contain numbers.',
          origin: 'Product of Origin',
          originPlaceholder: 'Please select where the product is produced.',
          size: 'Size (mm)',
          materials: 'Materials',
          materialsInputTitle: 'It must be 1~100 characters and can only contain letters, numbers, comma, and hyphen.',
          caution: 'Leave blank for information you do not want to disclose.'
        },
        introduction: {
          title: 'Product Introduction',
          caution: 'Product details not directly related to the product name may be prohibited by the administrator.'
        },
        catalog: {
          title: 'Catalog',
          subTitle: 'PDF only. Maximum upload file size :10MB',
          button: 'Select PDF',
          caution: 'Maximum file size is 10MB',
          cancel: 'Cancel'
        },
        confirm: {
          title: 'Confirm and Upload',
          subTitle: 'Please confirm the information above before submitting it. The information will be updated immediately.',
          button: 'Upload'
        }
      },
      kor: {
        requiredField: '<i class="fa fa-circle" aria-hidden="true"></i> 필수입력',
        uploadSuccess: '제품이 성공적으로 업로드 되었습니다. 제품 승인은 24시간까지 소요될 수 있습니다.',
        uploadFail: '제품 업로드 실패. 다시 시도해주세요.',
        header: {
          title: '제품 업로드'
        },
        category: {
          title: '카테고리',
          select: '선택한 카테고리: {category}',
          caution: '상품과 맞지 않는 카테고리에 등록할 경우 강제 이동되거나 중지, 또는 등록금지 될 수 있습니다.'
        },
        productName: {
          title: '제품명',
          inputTitle: '2~100자의 영어와 숫자, 마침표, 소괄호, 따옴표, 그리고 엠퍼샌드(&), 하이픈(-), 슬래시(/),만 입력해주세요.',
          placeholder: '제품 이름을 입력해주세요.',
          caution: '등록 상품과 직접 관련이 없는 다른 상품명, 유명 상품 유사문구, 스팸성 키워드 입력 시 관리자에 의해 등록 금지 될 수 있습니다.',
          hidden: '이미 등록된 같은 이름의 제품이 있습니다. 다른 이름을 입력해주세요.'
        },
        productImage: {
          title: '제품 이미지',
          subTitle: '첫 번째 사진에는 대표 이미지를 올려주세요. 최대 5개까지 등록할 수 있습니다.',
          mainImage: '대표 이미지',
          caution: '등록 상품과 관련이 없는 이미지를 올리면 관리자에 의해 등록 금지 될 수 있습니다.',
          alert: '제품 사진은 하나 이상 등록되어야 합니다.'
        },
        information: {
          title: '제품 정보',
          subTitle: '양식에 맞게 정확히 입력해주세요.',
          code: '제품 코드',
          moq: '최소 주문량 (MOQ)',
          moqInputTitle: '1~11자의 숫자만 입력해주세요.',
          origin: '생산지',
          originPlaceholder: '이 제품이 생산되는 곳을 선택해주세요.',
          size: '규격 (mm)',
          materials: '소재 및 재질',
          materialsInputTitle: '1~100자의 문자와 숫자, 쉼표, 그리고 하이픈(-)만 입력해주세요.',
          caution: '공개하고 싶지 않은 정보는 칸을 비워두세요.'
        },
        introduction: {
          title: '제품 설명',
          caution: '상품명과 직접적 관련 없는 상품상세, 외부 링크 입력 시 관리자에 의해 등록 금지 될 수 있습니다.'
        },
        catalog: {
          title: '카탈로그',
          subTitle: 'PDF 파일만 가능합니다. 최대 업로드 크기 :10MB',
          button: 'PDF 선택',
          caution: '파일 크기는 최대 10MB 입니다.',
          cancel: '취소'
        },
        confirm: {
          title: '확인 및 업로드',
          subTitle: '업로드 할 정보를 다시 한 번 확인하고 내용이 맞다면 업로드 버튼을 눌러주세요. 바로 웹사이트에 반영됩니다!',
          button: '업로드'
        }
      }
    },
    computed: {
      getCategory () {
        return this.value.primaryCategory + (this.value.secondaryCategory ? '> ' + this.value.secondaryCategory : '')
      }
    },
    methods: {
      filterProductDomain (productDomain) {
        let temp = productDomain
        temp = temp.replace(/[-`.,()&/]/g, ' ')
        temp = temp.trim()
        temp = temp.replace(/ +/g, '-')
        console.log(temp)
        return temp
      },
      countNameLength (e) {
        $(document).ready(() => {
          this.value.nameCount = $(e.target).val().length
        })
      },
      onPrimaryCategory (index, event) {
        $('.primary-category-container li').removeClass('active')
        $('.secondary-category-container li').removeClass('active')
        $(event.target).addClass('active')

        this.value.subCategories = this.value.categories[index].sub_category
        this.value.primaryCategory = this.value.categories[index].name
        this.value.secondaryCategory = ''
      },
      onSecondaryCategory (index, event) {
        $('.secondary-category-container li').removeClass('active')
        $(event.target).addClass('active')
        this.value.secondaryCategory = this.value.subCategories[index].name
      },
      onImageAdded (name, files) {
        const fileCount = files.length
        let childCount = ($('#image-container-ul')[0].children.length) - 1

        // single upload
        if (fileCount === 1 && childCount < 6) {
          this.addNewImage(childCount, files[0])
          // multiple upload
        } else {
          for (var i = 0; i < fileCount; i++) {
            if (childCount < 6) {
              this.addNewImage(childCount, files[i])
              childCount += 1
            }
          }
        }
        //
        console.log('current children count: ', childCount)
        if (childCount >= 5) {
          $('#image-add').remove()
        }
      },
      readURL ($li, file) {
        if (file) {
          var reader = new FileReader()
          reader.onload = (event) => {
            console.log(event)
            const url = event.target.result
            $li.css('display', 'inherit')
            $li.children('.each-image').attr('src', url)
          }
          reader.readAsDataURL(file)
        }
      },
      editURL ($image, file, index) {
        if (file) {
          var reader = new FileReader()
          reader.onload = (event) => {
            console.log(event)
            const url = event.target.result
            $image.attr('src', url)
            this.value.files[index - 1] = file
          }
          reader.readAsDataURL(file)
        }
      },
      addNewImage (index, file) {
        this.value.files.push(file)
        const $edit = $('#image-edit').clone()
        const $add = $('#image-add')
        var $label = $edit.children('label')
        var $input = $edit.children('input')
        var $image = $edit.children('img')
        $edit.removeAttr('id')
        $edit.attr('id', `image-edit-${index}`)
        $label.attr('for', `thumbnail-image-input-${index}`)
        $input.attr('id', `thumbnail-image-input-${index}`)
        $image.attr('id', `thumbnail-image-${index}`)
        $input.change((event) => {
          this.editURL($image, event.target.files[0], index)
        })
        $add.before($edit)
        this.readURL($edit, file)
      },
      preventEnterKeySubmit () {
        $('input').keydown(() => {
          if (event.keyCode === 13) {
            event.preventDefault()
          }
        })
      },
      DelayKeyupEvent () {
        var delay = (() => {
          var timer = 0
          return function (callback, ms) {
            clearTimeout(timer)
            timer = setTimeout(callback, ms)
          }
        })()
        $('#name-count-input').keyup(() => {
          delay(() => {
            this.checkProductNameIsAlreadyUsed()
          }, 800)
        })
      },
      async checkProductNameIsAlreadyUsed () {
        const getProducts = () => {
          return new Promise((resolve, reject) => {
            axios.get(`/api/data/product/account_id/${this.account.account_id}`)
              .then((res) => { resolve(res.data) })
              .catch((err) => { reject(err) })
          })
        }
        const checkProductName = (products) => {
          for (const i in products) {
            const productName = (products[i].product_name).toLowerCase()
            const inputName = (this.value.productName).toLowerCase()
            if (inputName === productName) {
              $('.name-container .hidden-text').css('display', 'inherit')
              this.toggle.productName = false
              return
            } else {
              $('.name-container .hidden-text').css('display', 'none')
              this.toggle.productName = true
            }
          }
        }
        try {
          const products = await getProducts()
          checkProductName(products)
        } catch (err) {
          console.log(err)
        }
      },
      activateJquery () {
        $(document).ready(() => {
          this.preventEnterKeySubmit()
          this.DelayKeyupEvent()
        })
      },
      onUploadButton () {
//        if (!this.value.primaryCategory) {
//          return alert('Select the product main category.')
//        }
//
//        if (!this.value.secondaryCategory) {
//          return alert('Select the product subcategory.')
//        }
        this.filterProductDomain(this.value.productName)

        if (!this.toggle.productName) {
          return alert('failed1')
        }

        if (this.value.files.length < 1) {
          return alert('failed2')
        }

        $('#modal-spinkit').removeClass().addClass('spinkit-modal')
        let formData = new FormData()
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }
        formData.append('product_name', this.value.productName)
        formData.append('product_domain', this.filterProductDomain(this.value.productName))
        formData.append('product_code', this.value.productCode)
        formData.append('product_image_url_1', 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/product_loading_image.png')
        formData.append('primary_product_category', this.value.primaryCategory)
        formData.append('secondary_product_category', this.value.secondaryCategory)
        formData.append('product_origin', this.value.origin)
        formData.append('item_dimensions', this.value.dimension)
        formData.append('material_type', this.value.materialType)
        formData.append('minimum_order_quantity', this.value.moq)
        formData.append('product_description', this.value.editor)
        for (var i = 0; i < this.value.files.length; i++) {
          formData.append('images', this.value.files[i])
        }
        if (document.getElementById('pdf-input').files[0]) {
          formData.append('pdf', document.getElementById('pdf-input').files[0])
        }
        console.log(formData)
//        axios.post(`/api/data/product/${this.account.account_id}`, formData, config)
//          .then(() => {
//            $('#modal-spinkit').removeClass()
//            alert('success')
//            this.$router.push('/dashboard/product')
//          })
//          .catch(() => {
//            $('#modal-spinkit').removeClass()
//            this.showAlert(false)
//          })
      },
      editFail () {
        this.showAlert(false)
      },
      showAlert (result) {
        $(document).ready(() => {
          window.scrollTo(0, 0)
          const $alert = $('#alert')
          if (result) {
            this.$store.commit('alert/changeState', true)
          } else {
            this.$store.commit('alert/changeState', false)
          }
          setTimeout(() => {
            $('.alert-container').hide()
          }, 6000)
          $alert.show()
        })
      },
      handleImageAdded (file, Editor, cursorLocation) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        $('#editor-spinkit').removeClass().addClass('spinkit-input')
        var formData = new FormData()
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }
        formData.append('images', file)
        axios.post(`/api/data/product/editor/${this.account.account_id}`, formData, config)
          .then((result) => {
            $('#editor-spinkit').removeClass().addClass('invisible')
            let url = result.data // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url)
          })
          .catch((err) => {
            $('#editor-spinkit').removeClass().addClass('invisible')
            console.log(err)
          })
      },
      onPDFchanged (files) {
        const maxSize = 15 * 1024 * 1024
        var fileSize = ((files[0].size) / 1024) / 1024
        fileSize = fileSize.toFixed(1)
        // over 15MB
        if (files[0].size > maxSize) {
          this.onPDFcancel()
          alert(this.getPDFcaution)
          return
        }

        $('#pdf-cancel-button').css('display', 'inline-block')
        this.msg.pdfText = `${files[0].name} (${fileSize}MB)`
        var reader = new FileReader()
        reader.onload = (event) => {
          console.log(event)
        }
        reader.readAsDataURL(files[0])
      },
      onPDFcancel () {
        $('#pdf-input').val('')
        this.msg.pdfText = ''
        $('#pdf-cancel-button').css('display', 'none')
      }
    },
    mounted () {
      this.value.categories = categories
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  #html-editor {
    height: 500px !important;
  }

  @height: 50px;
  @mark-right-amount: 12px;
  @small-mark-right-amount: 18px;
  @mark-bottom-amount: 16px;
  @font-size-button: 22px;
  @font-weight-button: 600;
  // Global
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
      border: 1px solid @color-link;
    }
  }
  /*<!--label {-->*/
  /*<!--.upload-label-basic;-->*/
  /*<!--border: 1px solid @color-font-base;-->*/
  /*<!--margin-top: 10px;-->*/
  /*<!--font-size: @font-size-button;-->*/
  /*<!--font-weight: @font-weight-button;-->*/
  /*<!--}-->*/
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
      border: 1px solid @color-link;
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

  .big-mark {
    position: absolute;
    font-size: 28px;
    font-weight: 100;
    right: @mark-right-amount;
  }
  .small-mark {
    position: absolute;
    font-size: 22px;
    font-weight: 100;
    width: 30px;
    color: @color-font-base;
    right: @small-mark-right-amount
  }
  .required-text {
    display: inline-block;
    vertical-align: top;
    padding-top: 4px;
    padding-left: 4px;
    color: @color-orange;
    font-size: 10px;
  }

  @media ( min-width: 768px ) {

  }

  @media ( min-width: 1128px ) {

    /* Global CSS */
    .dashboard-page-container {

      .header-container {
        .title {
          font-size: 30px;
          font-weight: 600;
        }
      }

      .body-container {

        .input-container {
          margin-bottom: 40px;
        }
        .title {
          display: inline-block;
          font-size: 30px;
          font-weight:600;
          margin-top: 0;
          margin-bottom:18px;
        }
        .sub-title {
          font-size: 20px;
          font-weight:300;
          margin-bottom: 8px;
        }
        .caution-text {
          font-size: 14px;
          font-weight: 300;
          margin: 0;
        }

        .category-container {
          position: relative;

          .category-inner-container {
            width: 100%;
            border: 1px solid @color-light-grey;
            margin-bottom: 12px;
            &:before {
              content: "";
              display: table;
            }
            &:after {
              content: "";
              display: table;
              clear: both;
            }

            ul {
              list-style: none;
              padding-left: 0;
              margin: 0;
              height: 250px;
              overflow: auto;

              .active {
                color: @color-orange;
                /*<!--background-color: @color-lightest-grey;-->*/
              }
            }
            li {
              position: relative;
              padding: 9px 14px;
              &:hover {
                background-color: @color-lightest-grey;
                cursor: pointer;
              }
            }

            .primary-category-container {
              position: relative;
              float: left;
              width: 30%;
              border-right: 1px solid @color-light-grey;
              li:after {
                position: absolute;
                top: 10px;
                right: 15px;
                width: 4px;
                height: 8px;
                content: ">";
              }
            }

            .secondary-category-container {
              position: relative;
              float: left;
              width: 70%;
            }
          }

          .hidden-text {
            font-size:17px;
            font-weight: 600;
            margin-bottom: 2px;
          }
        }

        .name-container {
          position: relative;

          .hidden-text {
            color: @color-red;
            font-weight: 500;
            font-size:17px;
            display: none;
          }
          .count-text {
            float: right;
            font-size: 15px;
            font-weight:600;
            margin-bottom: 4px;
            margin-right: 3px;
          }
        }

        .information-container {

          .box-container {
            position: relative;
            width: 100%;
            border: 1px solid @color-light-grey;
            border-radius: @border-radius;
            margin-bottom: 4px;

            .left-container {
              float: left;
              font-size: 16px;
              font-weight: 600;
              padding-left: 18px;
              height: @height;
              line-height: @height;
              width: 170px;
              border-right: 1px solid @color-light-grey;
            }
            .right-container {
              padding-left: 180px;

              input {
                border: none;
                margin-bottom: 0 !important;
              }
              select {
                position: relative;
                border: none;
                margin-bottom: 0 !important;
              }
              #disabled-option {
                color: @color-input-placeholder;
              }
            }
          }
        }

        .image-container {
          position: relative;

          .image-inner-container {
            position: relative;

            #thumbnail-text {
              position: absolute;
              text-align: center;
              font-size: 15px;
              color: @color-link;
              top: 155px;
              left: 57px;
            }

            .image-each-container {

              ul {
                list-style: none;
                margin: 0;
                padding: 0;

                &:before {
                  content: "";
                  display: table;
                }
                &:after {
                  clear: both;
                  content: "";
                  display: table;
                }

                li {
                  display: table-cell;
                  text-align: center;
                  position: relative;
                  float: left;
                  margin: 0 15px 15px 0;
                  padding: 0;
                  width: 188px;
                  height: 188px;

                  input {
                    display: none;
                  }

                  img {
                    width: 100%;
                    height: 100%;
                    border: 1px dashed @color-menu-gray;
                  }

                  label {
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    cursor: pointer;
                    vertical-align: middle;
                  }

                  .add-button {
                    position: absolute;
                    font-weight: 100;
                    font-size: 40px;
                    color: @color-font-base;
                    top: 75px;
                    left: 80px;
                  }

                  .deactive {
                    display: none;
                  }
                }
              }
            }

          }
        }

        .description-container {

          .quillWrapper {
            margin-bottom: 8px;
          }
        }

        .catalog-container {

          label {
            display: inline-block;
            .upload-label-basic;
            border: 1px solid @color-font-base;
            margin-top: 10px;
            font-size: @font-size-button;
            font-weight: @font-weight-button;
          }

          .file-information-container {
            margin-top: 8px;

            #pdf-cancel-button {
              display: none;
              font-size: 17px;
              margin-left: 8px;
            }
            #file-information-text {
              float: left;
              margin-top: 0;
              font-size: 17px;
              color: @color-font-gray;
            }
          }
        }

        .confirm-container {
          .title {
            margin-bottom: 0 !important;
          }
          .sub-title {
            margin-bottom: 40px !important;
          }
          button {
            font-size: @font-size-button;
            font-weight: @font-weight-button;
          }
        }

      }
    }

    /* Global CSS */

    /*<!--.right-container {-->*/
    /*<!--position: absolute;-->*/
    /*<!--z-index: 2;-->*/
    /*<!--width: 310px;-->*/
    /*<!--right: 0;-->*/
    /*<!--background-color: @color-white;-->*/

    /*<!--.title {-->*/
    /*<!--font-size: 28px !important;-->*/
    /*<!--font-weight:400 !important;-->*/
    /*<!--margin-bottom:0 !important;-->*/
    /*<!--}-->*/
    /*<!--.sub-title {-->*/
    /*<!--font-size: 18px !important;-->*/
    /*<!--font-weight:300 !important;-->*/
    /*<!--margin-bottom: 4px !important;-->*/
    /*<!--}-->*/

    /*<!--.each-container {-->*/
    /*<!--margin-bottom: 30px;-->*/
    /*<!--}-->*/

    /*<!--.caption {-->*/
    /*<!--margin-top: 60px;-->*/
    /*<!--font-weight:700;-->*/
    /*<!--}-->*/
    /*<!--}-->*/
  }
</style>
