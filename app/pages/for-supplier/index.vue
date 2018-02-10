<template>
  <div v-show="isLoaded">
    <navigation-bar/>
    <div class="home-container">
      <!-- Header -->
      <home-header></home-header>
      <!-- About us -->
      <home-about-us></home-about-us>
      <!--Testimonials-->
      <home-testimonials></home-testimonials>
      <!--Features-->
      <home-features></home-features>
      <!--Counters-->
      <home-counters></home-counters>
    </div>
    <footer-bar/>
    <copyright-bar/>
  </div>
</template>

<script>
  // components
  import NavigationBar from '~/components/NavigationBar'
  import Header from './components/Header.vue'
  import AboutUs from './components/AboutUs.vue'
  import Testimonials from './components/Testimonials.vue'
  import Features from './components/Features.vue'
  import Counters from './components/Counters.vue'
  import FooterBar from '~/components/FooterBar'
  import CopyrightBar from '~/components/CopyrightBar'
  import '~/plugins/for_supplier'
  export default {
    layout: 'blank',
    components: {
      NavigationBar,
      HomeHeader: Header,
      HomeAboutUs: AboutUs,
      HomeTestimonials: Testimonials,
      HomeFeatures: Features,
      HomeCounters: Counters,
      FooterBar,
      CopyrightBar
    },
    data () {
      return {
        isLoaded: false
      }
    },
    methods: {
      initScrollReveal () {
        window.scrollReveal = ScrollReveal()
      },
      activateJquery () {
        $(document).ready(() => {
          this.applySmoothScrolling()
          this.applyAddAnimation()
          this.isLoaded = true
        })
      },
      applySmoothScrolling () {
        //      Add smooth scrolling feature
//      Add the above line to ignore space and ';' issue
        $(document).ready(function () {
          // Select all links with hashes
          $('.nav-item, #scroll-to-top, #see-more-btn')
            .click(function (event) {
              // On-page links
              if (
                location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname
              ) {
                // Figure out element to scroll to
                var target = $(this.hash)
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
                // Does a scroll target exist?
                if (target.length) {
                  // Only prevent default if animation is actually gonna happen
                  event.preventDefault()
                  $('html, body').animate({
                    scrollTop: target.offset().top
                  }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target)
                    $target.focus()
                    if ($target.is(':focus')) { // Checking if the target was focused
                      return false
                    } else {
                      $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
                      $target.focus() // Set focus again
                    }
                  })
                }
              }
            })
        })
//    Add above line to enable not ignoring space and ';' issues
      },
      applyAddAnimation () {
        //      Add Animation
        $(document).ready(function () {
          scrollReveal.reveal('.scrollRight', {
            duration: 1000,
            scale: 1,
            origin: 'right',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollLeft', {
            duration: 1000,
            scale: 1,
            origin: 'left',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollRightDelay', {
            duration: 1000,
            delay: 300,
            scale: 1,
            origin: 'right',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollLeftDelay', {
            duration: 1000,
            delay: 300,
            scale: 1,
            origin: 'left',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollDownDelay', {
            duration: 1000,
            delay: 0,
            scale: 1,
            origin: 'top',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollUpDelay', {
            duration: 1000,
            delay: 0,
            scale: 1,
            origin: 'bottom',
            distance: '50px',
            easing: 'ease'
          })
        })
      }
    },
    mounted () {
      this.initScrollReveal()
      this.activateJquery()
    }
  }
</script>

<!-- Global setting is controlled by App.vue file. Please check out App.vue file.-->
<!-- 'scoped' attribute means below stylesheet is applied for only this vue file -->
<style>
  p {
    font-size: 14px;
  }
  /* Small Devices */
  @media only screen and (max-width: 767px) {
    .home-container .section-title {
      padding-top: 50px !important;
    }
  }
  /* Small Devices and Tablets */
  @media only screen and (max-width: 768px) {
    .home-container .section-title {
      padding-top: 50px !important;
    }
  }
  /* Medium Devices and Desktop */
  @media only screen and (max-width: 992px) {
  }
  /* Large Devices and Wide Screen */
  @media only screen and (max-width: 1200px) {
  }
  /*=============== Generic CSS =================*/
  .home-container {
    overflow-x: hidden;
  }
  .home-container .section-title {
    padding-top: 90px;
    padding-bottom: 50px;
  }
  .home-container .section-title h2 {
    position: relative;
    text-align: center;
    color: #333;
    font-size: 40px;
    font-weight: 500;
  }
  .home-container .section-title p {
    color: #484848;
    font-size: 20px;
    line-height: 28px;
    font-weight: 300;
    text-align: center;
    margin-top: 10px;
  }
</style>
