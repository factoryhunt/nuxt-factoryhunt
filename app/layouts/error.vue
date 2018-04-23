<template>
  <div class="body-contents">

    <div class="content">

      <div class="right-container">
        <img 
        id="warning"
        src="~assets/icons/warning.svg" alt="warning">
      </div>

      <div class="left-container">
        <h1 v-if="error.statusCode === 404">Oops!</h1>
        <p class="desc">We can't seem to find the page you're looking for.</p>

        <div class="link-container">
          <p>Here are some helpful links instead:</p>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default',
  created () {
    console.log(this.error)
  }
}
</script>

<style lang="less" scoped>
  @import '~assets/css/index';
  * {
    margin: 0;
  }

  .body-contents {
    margin: 40px 0;
  }

  .right-container {
    position: relative;
    text-align: center;

    @media (min-width:744px) {
      position: absolute;
      padding-left: 550px;
      text-align: left; 
    }

    #warning {
      width: 70px;
      
      @media (min-width:744px) {
        width: 250px;
      }
    } 
  }
  
  .content {
    position: relative;
  }
  .left-container {
    @media (min-width:744px) {
      max-width: 500px;
    }
  }
  h1 {
    margin: 0;
    text-align: center;
    font-size: 70px;

    @media (min-width:744px) {
      text-align: left;
      font-size: 150px; 
    }
  }
  .desc {
    margin-top: 12px;
    font-size: 30px;
  }

  .link-container {
    margin-top: 20px;
    font-size: 15px;
  }
  ul {
    margin-right: 0;
    margin-left: 0;
    padding: 0;
    list-style: none;
  }
  
</style>
