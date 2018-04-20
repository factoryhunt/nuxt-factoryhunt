<template>
  <section class="counter">
    <div class="counter-overlay">
      <div class="container scrollUpDelay">
        <div class="row text-center">
          <div class="col-md-4">
            <div class="counter-item">
              <div><i class="fa fa-database"></i></div>
              <h2><span class="counter-num"> 300,000 </span><span>+</span></h2>
              <p>{{ $t('forSupplier.counters.item1') }}</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="counter-item">
              <div><i class="fa fa-users"></i></div>
              <h2><span class="counter-num"> 100,000 </span><span>+</span></h2>
              <p>{{ $t('forSupplier.counters.item2') }}</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="counter-item">
              <div><i class="fa fa-cubes"></i></div>
              <h2><span class="counter-num"> 999 </span><span>+</span></h2>
              <p>{{ $t('forSupplier.counters.item3') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    mounted () {
    }
  }
</script>

<style scoped>

  /* Small Devices */
  @media only screen and (max-width: 767px) {
    .counter-item {
      padding-top: 20px !important;
      padding-bottom: 20px !important;
    }
  }
  /* Small Devices and Tablets */
  @media only screen and (max-width: 768px) {

  }
  /* Medium Devices and Desktop */
  @media only screen and (max-width: 992px) {
  }
  /* Large Devices and Wide Screen */
  @media only screen and (max-width: 1200px) {
  }

  /*=============== Counters ===============*/
  /*.counter {*/
    /*background-image: url("../../../assets/for_supplier/counter-bg.jpg");*/
    /*background-repeat: no-repeat;*/
    /*background-attachment: fixed;*/
    /*-moz-background-size: cover;*/
    /*-o-background-size: cover;*/
    /*-webkit-background-size: cover;*/
    /*background-size: cover;*/
  /*}*/
  /*.counter {*/
    /*background-color: #484848;*/
  /*}*/
  .counter-overlay {
    padding-top: 60px;
    padding-bottom: 60px;
    background: rgba(41, 41, 41, 1);
  }
  .counter-item i {
    color: #F2583D;
    font-size: 60px;
  }
  .counter-item h2 {
    color: #D7DADB;
    font-weight: 700;
    font-size: 35px;
    margin-top: 15px;
    margin-bottom: 1px;
  }
  .counter-item p {
    color: #D7DADB;
    font-size: 20px;
    margin-top: 0;
    font-weight: 300;
  }
</style>
