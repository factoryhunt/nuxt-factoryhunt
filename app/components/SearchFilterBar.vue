<template>
  <div id="filter-bar">
    <div class="body-container">

      <div id="filter-container">

        <div
          v-for="(button,bIndex) in buttons" 
          :key="bIndex"
          class="button-container">
          <button 
            :id="`button-${bIndex}`"
            @click="button.onClick($event, bIndex)">
            {{button.title}}
            <i 
              class="fa fa-caret-down" 
              aria-hidden="true"
              v-if="button.type === 'dropdown'">
            </i>
          </button>
          <!-- Dropdown Menus -->
          <!-- Country Filter -->
          <div 
            class="dropdown-container country"
            v-if="bIndex === 1 && toggle.country">
            <ul>
              <li 
                v-for="(country, oIndex) in countries" 
                :key="oIndex"
                @click="onClickCountry(country.key, oIndex)">
                {{country.key}} <span id="country-count">{{getCountryCount(country.doc_count)}}</span>
              </li>
            </ul>
          </div>
          <!-- Another.. -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { addComma } from '~/utils/text'
export default {
  props: {
      countries: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
  data () {
    return {
      buttons: [
        {
          title: 'All',
          type: 'button',
          onClick: this.onClickAllButton
        },
        {
          title: 'Country',
          type: 'dropdown',
          onClick: this.toggleCountry
        },
      ],
      options: {
        country: ['South Korea', 'Canada', 'Philippines', 'India', 'Australia', 'Malaysia', 'United States']
      },
      toggle: {
        country: false
      }
    }
  },
  computed: {
    getToggle (buttonIndex) { 
      switch (buttonIndex) {
        case 0:
        return 
        break
        default:
        break
      }
      return this.toggle.country
    }
  },
  methods: {
    getCountryCount (string) {
      return addComma(string)
    },
    highlightButton () {
      const query = this.$route.query

      if (!query.category && !query.country) {
        document.getElementById('button-0').className = 'highlight'
      }

      if (query.country) {
        this.buttons[1].title = query.country
        document.getElementById('button-1').className = 'highlight'
      }
    },
    onClickAllButton (event, index) {
      const input = this.$route.query.q
      location.href = `/search?q=${input}`
    },
    onClickCountry (value, index) {
      console.log(this.$route.query)
      let href = location.href
      const query = `&country=${value}`
      const reg = /&country=([^&]*)/g
      const result = reg.test(href)

      if (result) href = href.replace(reg, query)
      else href = href + query

      location.href = href
    },
    toggleCountry () {
      this.toggle.country = !this.toggle.country
    }
  },
  mounted () {
    this.highlightButton()
  }
}
</script>

<style lang="less" scoped>
@import "~assets/css/index";

#filter-bar {
  margin-bottom: 14px;
  background-color: #f3f3f3;
  color: @color-deep-gray;
  // box-shadow: 0 2px 4px @color-light-gray;
}
#filter-container {
  display: table;
  list-style: none;
  vertical-align: middle;
  margin: 0;
  padding: 0;
  height: 44px;
}
.button-container {
  display: table-cell;
  padding: 0 9px;
  vertical-align: middle;

  button {
    border: 0;
    background-color: transparent;
    color: @color-font-gray;
    font-size: 14px;
    height: 100%;
    border-bottom: 2px solid transparent;

    &:hover {
      color: @color-deep-gray;
      border-bottom: 2px solid @color-deep-gray;
    }

    i {
      display: inline-block;
      margin-left: -1px;
    }

    &.highlight {
      font-weight: bold;
    }
  }
}
.dropdown-container {
  position: absolute;
  top: 99%;
  background-color: @color-white;
  box-shadow: 0 2px 4px @color-light-gray;
  border-radius: 5px;
  z-index: 10;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  padding: 12px 18px;
  font-size: 13px;
  min-width: 160px;
  transition: background-color linear .2s;

  &:hover {
    cursor: pointer;
    background-color: @color-lightest-grey;
  }

  #country-count {
    float:right;
    color: gray;
    font-size: 11px;
    text-align: right;
  }
}
</style>
