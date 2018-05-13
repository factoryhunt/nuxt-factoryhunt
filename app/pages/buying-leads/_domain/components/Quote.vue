<template>
  <div class="quote-container">
    <div class="quote-wrapper">
      <h4>3 Quotes Record</h4>
      <!-- Quote -->
      <main class="quote">
        <div class="header">
          <div class="profile-container">
            <div class="img-container">
              <img src="~assets/icons/user.svg">
            </div>
            <span class="name">Peter Kim</span>
            <span class="role">Exporting Branch Office / Product Manager</span>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '~assets/css/index';

@section-margin: 30px;
@card-padding: 20px;

* {
  margin: 0;
  padding: 0;
}

.quote-container {
  margin-top: @section-margin;
}
h4 {
  text-transform: uppercase;
  color: @color-deep-gray;
  font-size: 14px;
}
.quote {
  .gray-border;
  margin-top: 12px;
  padding: @card-padding;
  background-color: @color-white;

  .img-container {
    width: 40px;
    height: 40px;
  }
}
</style>
