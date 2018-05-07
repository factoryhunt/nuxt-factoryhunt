<template>
  <main id="feed-container">
    <div class="feed__user card">
      <div class="profile-img-container">
        <img
        id="profile-img"
       :src="user.account.logo_url">
      </div>
      <div class="input-container">
        <input 
        type="text"
        placeholder="What are you looking for?">
      </div>
    </div>
    <div class="feed__leads card">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias nisi accusamus amet aliquid ipsam dignissimos sint et ipsum repellat laudantium commodi, animi omnis doloremque sunt tempora modi non quidem quisquam?
    </div>
    <div class="feed__leads card">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias nisi accusamus amet aliquid ipsam dignissimos sint et ipsum repellat laudantium commodi, animi omnis doloremque sunt tempora modi non quidem quisquam?
    </div>
  </main>
</template>

<script>
export default {
  props: ['user']
}
</script>


<style lang="less" scoped>
@import '~assets/css/index';
@import '~assets/css/less/buying_leads/index';

#feed-container {
  flex: 1 !important;
}

.card {
  padding: 20px;
  background-color: @color-white;
  .gray-border;
}

.feed__user {
  display: flex;

  .profile-img-container {
  }
  #profile-img {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    border: 1px solid @color-border-gray;
    border-radius: 50%;
  }
  .input-container {
    width: 100%;
    height: 100%;
  }
  input {
    width: 100%;
    padding: 0 !important;
    border: 0 !important;
    font-size: @font-size__basic;
  }
}

.feed__leads {
  margin-top: @container-margin;
}
</style>
