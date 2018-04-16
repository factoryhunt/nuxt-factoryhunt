<template>
  <div id="filter-bar">
    <div class="body-container">

      <ul id="filter-container">

        <li class="button-container">
          <div>All</div>
        </li>

        <li class="button-container dropdown" @click="onClickCountry">
          <div>{{options.country}}</div>
          
          <div id="dropdown-container" v-if="toggle.category">
            <ol>
              <li>Malaysia</li>
              <li>Thailand</li>
              <li>United States</li>
              <li>China</li>
              <li>South Korea</li>
              <li>India</li>
            </ol>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: {
        country: 'Country'
      },
      toggle: {
        category: false
      }
    }
  },
  methods: {
    onClickCountry () {
      this.toggle.category = !this.toggle.category
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/css/index";

#filter-bar {
  margin-bottom: 20px;
  background-color: #f3f3f3;
  color: @color-deep-gray;
  box-shadow: 0 2px 4px @color-light-gray;
}
#filter-container {
  display: table;
  list-style: none;
  vertical-align: middle;
  margin: 0;
  padding: 0;
  height: 40px;
}
.button-container {
  position: relative;
  display: table-cell;
  white-space: nowrap;
  height: 50px;
  line-height: 50px;
  padding: 0 16px;
  border-bottom: 3px solid transparent;
  font-size: @font-size-small;

  &.dropdown {
    padding-right: 32px;
    background: url(~assets/icons/arrow-angle-down.png);
    background-repeat: no-repeat;
    background-size: 10px;
    background-position: 80% center;
  }

  &:hover {
    cursor: pointer;
    border-bottom: 3px solid @color-deep-gray;
  }
}

#dropdown-container {
  box-shadow: 0 2px 4px @color-light-gray;
  background-color: @color-white;
  position: absolute;
  left: 0;
  top: calc(100% + 5px);
  z-index: 10;

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    white-space: nowrap;
    padding: 10px 16px;

    &:hover {
      font-weight: bold !important;
    }
  }
}
</style>
