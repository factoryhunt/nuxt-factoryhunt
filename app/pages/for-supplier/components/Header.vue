<template>
  <header class="header" id="HOME">

    <div class="header-overlay">
      <div class="container header-container">
        <div class="row">
          <div class="col-md-6">
            <div class="header-text">
              <!-- Title & Description -->
              <h1 v-html="$t('forSupplier.header.title')"></h1>
              <p v-html=" $t('forSupplier.header.p') "></p>
            </div>
            <div class="header-btns scrollLeft">
              <!-- Header buttons -->
              <a href="/signup" id="startButton" class="btn btn-check">{{  $t('forSupplier.header.buttonLeft') }}</a>
              <a href="#ABOUT" id="see-more-btn" class="btn btn-tour" v-html="$t('forSupplier.header.buttonRight')"></a>
            </div>
          </div>
          <div class="col-md-5 col-md-offset-1 scrollRight">
            <div class="header-signup">
              <!-- SignUp form -->
              <div class="signup-form text-gray bg-gray-light">
                <form @submit.prevent="onSignUpButton">
                  <div style="margin:0;padding:0;display:inline">
                    <input name="utf8" type="hidden" value="✓">
                  </div>
                  <dl class="form-group mt-0">
                    <dt class="input-label">
                      <label class="form-label f5" for="userCompany">{{ $t('forSupplier.header.companyName.title') }}</label>
                    </dt>
                    <dd>
                      <input 
                      type="text" 
                      pattern="[A-Za-z0-9 ().,&]{2,50}"
                      :placeholder="$t('forSupplier.header.companyName.placeholder')" 
                      :title="$t('forSupplier.header.companyName.inputTitle')" 
                      required 
                      id="userCompany" 
                      v-model="value.company" 
                      class="form-control form-control-lg input-block" 
                      autofocus="">
                    </dd>
                  </dl>
                  <dl class="form-group">
                    <dt class="input-label">
                      <label class="form-label f5" for="userEmail">{{ $t('forSupplier.header.email.title') }}</label>
                    </dt>
                    <dd>
                      <input type="email" required id="userEmail" v-model="value.email" class="form-control form-control-lg input-block" placeholder="you@example.com">
                    </dd>
                  </dl>
                  <dl class="form-group form-group-password">
                    <dt class="input-label">
                      <label class="form-label f5" for="userPassword">{{ $t('forSupplier.header.password.title') }}</label>
                    </dt>
                    <dd>
                      <input type="password" id="userPassword" v-model="value.password" :placeholder="$t('forSupplier.header.password.placeholder')" :title="$t('forSupplier.header.password.inputTitle')" class="form-control form-control-lg input-block" required minlength="8">
                    </dd>
                    <p class="form-control-note1">{{ $t('forSupplier.header.caution') }}</p>
                  </dl>
                  <spinkit id="sign-up-spinkit"></spinkit>
                  <button class="btn btn-primary btn-large btn-block btn-signup">{{ $t('forSupplier.header.signUpButton') }}</button>
                  <p class="form-control-note2 mb-0 text-center" v-html="$t('forSupplier.header.agreement')">
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Spinkit from '~/components/Loader'
export default {
  components: {
    Spinkit
  },
  data() {
    return {
      value: {
        company: '',
        email: '',
        password: ''
      },
      toggle: {
        isDropdownShown: false
      }
    }
  },
  methods: {
    async onSignUpButton() {
      const $spinkit = $('#sign-up-spinkit')
      const $signUpButton = $('.btn-signup')
      try {
        $spinkit.removeClass().addClass('spinkit-input')
        $signUpButton.css('display', 'none')
        await this.signUp()
        alert(this.$t('signUp.signUpSuccess'))

        location.href = '/signup/step1'
      } catch (err) {
        $spinkit.removeClass().addClass('invisible')
        $signUpButton.css('display', 'inherit')
        alert(err.msg_kor)
      }
    },
    signUp() {
      return new Promise((resolve, reject) => {
        const data = {
          company: this.value.company,
          email: this.value.email,
          password: this.value.password
        }
        this.$store
          .dispatch('auth/signUp', data)
          .then(() => {
            resolve()
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    onLoginButton() {
      this.$router.push('login')
    },
    onLogoutButton() {
      this.$store.dispatch('auth/logout')
    },
    onProfileImage() {
      const dropdown = $('.dropdown-content')

      if (this.toggle.isDropdownShown) dropdown.css({ display: 'none' })
      else dropdown.css({ display: 'inherit' })
      this.toggle.isDropdownShown = !this.toggle.isDropdownShown
    },
    activateJquery() {
      //    Show and hide menu
      //      $(document).ready(function () {
      //
      //        $(window).scroll(function () {
      //
      //          if ($(window).scrollTop() < 80) {
      //            $('.navbar').css({
      //              'margin-top': '-100px',
      //              'opacity': '0'
      //            })
      //            $('.navbar-default').css({
      //              'background-color': 'rgba(59, 59, 59, 0)'
      //            })
      //          } else {
      //            $('.navbar').css({
      //              'margin-top': '0px',
      //              'opacity': '1'
      //            })
      //            $('.navbar-default').css({
      //              'background-color': 'rgba(59, 59, 59, 0.7)',
      //              'border-color': '#444'
      //            })
      //            $('.navbar-brand img').css({
      //              'height': '35px',
      //              'padding-top': '0px'
      //            })
      //            $('.navbar-nav > li > a').css({
      //              'padding-top': '15px'
      //            })
      //          }
      //        })
      //      })
      //    Active menu item on user click
      $(document).ready(function() {
        $('.navbar-nav li a').click(function() {
          $('.navbar-nav li a')
            .parent()
            .removeClass('active')
          $(this)
            .parent()
            .addClass('active')
        })
        //    Highlight menu item on scroll
        $(window).scroll(function() {
          //
          //          $(".navbar-nav li a[href='#HOME']").parent().removeClass('active')
          $('section').each(function() {
            var bb = $(this).attr('id') // ABOUT, CONTACT, CHECK
            var hei = $(this).outerHeight()
            var grttop = $(this).offset().top - 70
            if ($(window).scrollTop() > grttop && $(window).scrollTop() < grttop + hei) {
              $(".navbar-nav li a[href='#" + bb + "']")
                .parent()
                .addClass('active')
            } else {
              $(".navbar-nav li a[href='#" + bb + "']")
                .parent()
                .removeClass('active')
            }
          })
        })
        // customized error _conversation_id
        var passwordInput = document.getElementById('userPassword')
        passwordInput.addEventListener(
          'invalid',
          function(e) {
            if (passwordInput.validity.valueMissing) {
              e.target.setCustomValidity('비밀번호를 입력해 주세요.')
            } else if (!passwordInput.validity.valid) {
              e.target.setCustomValidity(
                '비밀번호는 문자와 숫자의 조합으로 최소 8 문자를 포함해야 합니다.'
              )
            }
            // to avoid the 'sticky' invlaid problem when resuming typing after getting a custom invalid _conversation_id
            passwordInput.addEventListener('input', function(e) {
              e.target.setCustomValidity('')
            })
          },
          false
        )
      })
    }
  },
  mounted() {
    this.activateJquery()
  }
}
</script>

<style lang="less" scoped>
#sign-up-spinkit {
  margin-bottom: 20px;
}

/* Small Devices */
@media only screen and (max-width: 767px) {
  #loginButton {
    display: none;
  }
  #factoryhunt-navbar-collapse-1 {
    border-top-width: 0;
  }
  #startButton {
    display: none;
  }
  .header-container {
    padding-top: 40px !important;
  }
  .header-btns {
    margin-top: 40px !important;
    margin-bottom: 10px !important;
  }
  .signup-form {
    display: none;
  }
}
/* Small Devices and Tablets */
@media only screen and (max-width: 768px) {
  #loginButton {
    display: none;
  }
  #factoryhunt-navbar-collapse-1 {
    border-top-width: 0px;
  }
  #startButton {
    display: none;
  }
  .header-container {
    padding-top: 40px !important;
  }
  .header-btns {
    margin-top: 40px !important;
    margin-bottom: 10px !important;
  }
  .signup-form {
    display: none;
  }
}
/* Medium Devices and Desktop */
@media only screen and (max-width: 992px) {
}
/* Large Devices and Wide Screen */
@media only screen and (max-width: 1200px) {
}

/*=============== Header ===============*/
.header-container {
  padding-top: 100px;
  padding-bottom: 100px;
}
.header {
  background-image: url(https://s3-us-west-1.amazonaws.com/factoryhunt.com/img/header-bg.jpg);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -webkit-background-size: cover;
}
.header-overlay {
  background-color: rgba(31, 31, 31, 0.75);
}
.logo img {
  width: 55px;
  padding-bottom: 50px;
}
.header-text h1 {
  color: #fff;
  font-size: 35px;
  font-weight: 300;
  line-height: 40px;
  padding-top: 30px;
  padding-bottom: 11px;
}
.header-text p {
  color: #fff;
  font-size: 20px;
  line-height: 32px;
  font-weight: 300;
  margin-bottom: 3px;
}
.header-btns {
  margin-top: 90px;
  margin-bottom: 50px;
}
.btn-check,
.btn-check:focus,
.btn-check:active,
.btn-check:visited {
  color: #f2583d;
  background: transparent;
  border: 1px solid #f2583d;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 19px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: all 500ms;
  -moz-transition: all 500ms;
  -ms-transition: all 500ms;
  -o-transition: all 500ms;
  transition: all 500ms;
}
.btn-check:hover {
  background-color: #f2583d;
  color: #fff;
}
.btn-tour,
.btn-tour:focus,
.btn-tour:active,
.btn-tour:visited {
  color: #a9adb0;
  margin-left: 20px;
  font-size: 19px;
  font-weight: 500;
  background: transparent;
  -webkit-transition: all 500ms;
  -moz-transition: all 500ms;
  -ms-transition: all 500ms;
  -o-transition: all 500ms;
  transition: all 500ms;
}
.btn-tour:hover {
  color: #fff;
}
.btn-tour i {
  font-size: 20px;
  padding-left: 5px;
  color: #f2583d;
}
.signup-form .form-control {
  display: block;
  width: 100%;
  height: 50px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 21px;
  color: #555;
  background-color: transparent;
  border: 1px solid #aeaeae;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  margin-bottom: 15px;
  opacity: 0.8;
  outline: 0px !important;
  -webkit-transition: all 500ms;
  -moz-transition: all 500ms;
  -ms-transition: all 500ms;
  -o-transition: all 500ms;
  transition: all 500ms;
}
.form-group-password {
  margin-bottom: 15px;
}
#HOME {
  outline: none !important;
}

/*=============== SignUp Form ===============*/
.signup-form {
  padding-top: 24px !important;
  padding-bottom: 24px !important;
  padding-right: 24px !important;
  padding-left: 24px !important;
  border-radius: 3px !important;
  font-size: 18px !important;
}
.bg-gray-light {
  background-color: #fafbfc !important;
}
.text-gray {
  color: #586069 !important;
}
.form-control-note1 {
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 13px;
  color: #6a737d;
}
.form-control-note2 {
  margin-top: 15px;
  margin-bottom: 0;
  font-size: 12px;
  color: #6a737d;
}
.btn-signup {
  font-size: 16px;
  padding: 0.75em 1.25em;
  border-radius: 6px;
  color: #fff;
  background-color: #f2583d;
  background-image: linear-gradient(-180deg, #ff844a 0%, #f2583d 90%);
  border: none;
}
.btn-signup,
.btn-signup:focus,
.btn-signup:active,
.btn-signup:visited,
.btn-signup:hover {
  outline: none;
}

/* When the pattern is matched */
input[type='text']:valid,
input[type='email']:valid,
input[type='password']:valid {
  border: 0.5px solid #009933;
}
</style>
