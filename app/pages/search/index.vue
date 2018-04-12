<template>
  <section id="container">

    <div class="body-container">

      <!-- search result -->
      <div class="info-container">

        <!-- Breadcrumb -->
        <ul 
        class="breadcrumb-container" 
        v-show="doesCategoryExist"
        itemscope 
        itemtype="http://schema.org/BreadcrumbList">
          <li 
          itemscope
          itemtype="http://schema.org/ListItem"
          itemprop="itemListElement">
            <a 
            href="/"
            itemscope 
            itemtype="http://schema.org/Thing"
            itemprop="item"> 
                <span itemprop="name">Home</span>
            </a>
            <meta itemprop="position" content="1"/>
          </li>
          <span class="separator">›</span>
          <li 
          v-show="largeCategory"
          itemscope 
          itemtype="http://schema.org/ListItem"
          itemprop="itemListElement">
            <a 
            :href="`/search?q=${largeCategory}`"
            itemscope 
            itemtype="http://schema.org/Thing"
            itemprop="item">
                <span itemprop="name">{{largeCategory}}</span>
            </a>
            <meta itemprop="position" content="2"/>
          </li>
          <span class="separator">›</span>
          <li 
          itemscope 
          itemtype="http://data-vocabulary.org/Breadcrumb">
            <a 
            :href="`/search?q=${middleCategory}`"
            itemscope 
            itemtype="http://schema.org/Thing"
            itemprop="item">
                <span itemprop="name">{{middleCategory}}</span>
            </a>
            <meta itemprop="position" content="3"/>
          </li>
        </ul>

        <!-- Search Result -->
        <p class="number-of-result">{{ $t('search.suppliers', {count: getAccountCount}) }}</p>
        <!--<div class="sub-container" v-show="editedInput">-->
          <!--<p class="edited">Including results for <a class="font-weight-bold font-style-italic">{{editedInput}}</a></p>-->
          <!--<p class="raw">Do you want results only for <a>{{queryInput}}</a></p>-->
        <!--</div>-->
      </div>

      <!-- Suppliers -->
      <div class="supplier-outer-container each-container">
        <loader id="loader"/>
        <div v-if="account_count > 0">
          <section class="supplier-container">
            <div class="supplier-wrapper" v-for="(account,index) in accounts" :key="index">
              <h1 class="company-name" @click="routeSupplierPage(account._source)">{{account._source.account_name}}</h1>
              <i v-show="isApprovedAccount(account)" id="verified-mark" class="fa fa-check-circle" aria-hidden="true"></i>
              <h3 class="website">{{account._source.website}}</h3>
              <h2 class="product" v-html="account.highlight ? account.highlight.products[0] : account._source.products"></h2>
              <h3 class="phone">{{account._source.phone}}</h3>
              <h3 class="address">{{account._source.mailing_country}}</h3>
            </div>
          </section>
          <ul class="pagination">
            <li v-show="page !== 0" @click="movePreviousPage"><i class="fa fa-angle-left"></i></li>
            <li
              v-for="(p, index) in Math.ceil(account_count / PAGE_ITEM_NUMBER)"
              :key="index"
              v-if="index < PAGINATION_NUMBER && ((page * PAGINATION_NUMBER) + index) < Math.ceil(account_count / PAGE_ITEM_NUMBER)"
              :class="(page * PAGINATION_NUMBER) + index === selected ? 'selected' : ''"
              @click="onPagination((page * PAGINATION_NUMBER) + index)">
              {{(page * PAGINATION_NUMBER) + (index + 1)}}
            <li v-show="isLastPage" @click="moveNextPage"><i class="fa fa-angle-right"></i></li>
          </ul>
        </div>
        <div v-else>
          <section>
            Sorry, no result.
          </section>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import Loader from '~/components/Loader'
  import { Inflectors } from 'en-inflectors'
  import synonyms from 'synonyms'
  import { addComma, removeNullInArray } from '~/utils/text'
  import { getParentCategories } from '~/utils/category'
  export default {
    scrollToTop: true,
    layout: 'minify',
    components: {
      Loader
    },
    head () {
      return {
        title: `${this.queryInput}`,
        meta: [
          { hid: 'og-title', property: 'og:title', content: `${this.queryInput} | Factory Hunt` },
          { hid: 'og-description', property: 'og:description', content: `Search result for ${this.queryInput}.` },
          { hid: 'og-url', property: 'og:url', content: `ttps://www.factoryhunt.com/search?q=${this.queryInput}` },
          { hid: 'twitter-title', property: 'twitter:title', content: `${this.queryInput} | Factory Hunt` }
        ],
        // script: [
        //   { type: 'application/ld+json', src: JSON.stringify(this.structuredData) }
        // ],
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/search?q=${this.queryInput}` }
        ]
      }
    },
    async asyncData ({ query }) {
      try {
        let { data } = await axios.get(`/api/data/search/elastic/${query.q}/0`)
        const categories = await getParentCategories(query.q)
        let editedInput
        return {
          queryInput: query.q,
          queryOption: {
            category: parseInt(query.category, 10) === 1
          },
          largeCategory: categories.large_category,
          middleCategory: categories.middle_category,
          editedInput: data.total ? query.q : '',
          accounts: data.hits,
          account_count: data.total
        }
      } catch (err) {
        return {
          queryInput: query.q,
          queryOption: {
            category: false
          },
          accounts: {},
          account_count: 0
        }
      }
    },
    data () {
      return {
        structuredData: {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://example.com/books",
              "name": "Books",
              "image": "http://example.com/images/icon-book.png"
            }
          },{
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "https://example.com/books/authors",
              "name": "Authors",
              "image": "http://example.com/images/icon-author.png"
            }
          },{
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@id": "https://example.com/books/authors/annleckie",
              "name": "Ann Leckie",
              "image": "http://example.com/images/author-leckie-ann.png"
            }
          },{
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@id": "https://example.com/books/authors/ancillaryjustice",
              "name": "Ancillary Justice",
              "image": "http://example.com/images/cover-ancillary-justice.png"
            }
          }]
        },
        queryInput: '',
        accounts: {},
        account_count: 0,
        page: 0,
        selected: 0,
        PAGE_ITEM_NUMBER: 15,
        PAGINATION_NUMBER: 10
      }
    },
    computed: {
      getAccountCount () {
        return addComma(this.account_count)
      },
      doesCategoryExist () {
        if (this.largeCategory) return true
        if (this.middleCategory) return true
        if (!this.queryOption.category) return false

        return false
      },
      isLastPage () {
        const pagination = Math.ceil((this.account_count / 15) / 10)
        return this.page < (pagination - 1)
      }
    },
    methods: {
      isApprovedAccount (account) {
        return account._source.account_status === 'approved'
      },
      routeSupplierPage (account) {
        if (account.account_status === 'approved') {
          const url = account.domain
          window.open(`/${url}?q=${this.queryInput}`)
        } else {
          window.open(`/supplier/${account.domain}?q=${this.queryInput}`)
        }
      },
      // Deprecated
      routeProductProfilePage (index) {
        const productDomain = this.products[index].product_domain
        if (this.value.input) {
          this.$router.push(`/${this.value.company}/${productDomain}?q=${this.value.input}`)
        } else {
          this.$router.push(`/${this.value.company}/${productDomain}`)
        }
      },
      highlightMatchedText () {
        let keyword = new Inflectors(this.queryInput)
        // console.log('singular', keyword.toSingular())
        // console.log('plural', keyword.toPlural())
        // console.log('synonyms with search keyword: ', synonyms(this.queryInput, 'n'))

        var context = document.querySelector('.body-container')
        var instance = new Mark(context)
        const options = {
          accuracy: 'exactly',
          wildcards: 'enable'
        }
        // Example: toy toys toy, toys,
        instance.mark(`${keyword.toSingular()}`, options)
        instance.mark(`${keyword.toSingular()},`, options)
        instance.mark(`${keyword.toPlural()}`, options)
        instance.mark(`${keyword.toPlural()},`, options)
      },
      async onPagination (index) {
        window.scrollTo(0, 0)
        this.activateLoader()
        this.accounts = {}
        this.selected = index
        // console.log(index)
        let { data } = await axios.get(`/api/data/search/elastic/${this.queryInput}/${index}`)
        // console.log(data.hits)
        this.accounts = data.hits
        this.deactivateLoader()
      },
      moveNextPage () {
        if (this.page <= this.account_count / this.PAGE_ITEM_NUMBER) {
          this.page = this.page + 1
          this.selected = 0
          this.onPagination(this.page * this.PAGINATION_NUMBER)
        }
      },
      movePreviousPage () {
        if (this.page > 0) {
          this.page = this.page - 1
          this.selected = 0
          this.onPagination(this.page * this.PAGINATION_NUMBER)
        }
      },
      activateLoader () {
        $(document).ready(() => {
          const $loader = $('#loader')
          $loader.removeClass().addClass('spinkit-default')
        })
      },
      deactivateLoader () {
        $(document).ready(() => {
          const $loader = $('#loader')
          $loader.removeClass().addClass('invisible')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';

  .breadcrumb-container {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-bottom: 20px;

    li {
      display: inline-block;
    }

    .separator {
      padding-left: 3px;
      padding-right: 7px;
    }
  }

  #container {
    padding-top: 20px;

    .info-container {
      margin-bottom: 30px;

      p {
        margin: 0;
      }
      .number-of-result {
        font-size: @font-size-small;
        font-weight: @font-weight-medium;
        color: @color-deep-gray;
      }
      .sub-container {
        margin-top: 30px;
        .edited {
          font-size: @font-size-medium;
          color: @color-black;
        }
        .raw {
          font-size: @font-size-small;
        }
      }
    }

    .supplier-outer-container {

      @margin: 1.5px 0;

      padding-bottom: 2rem;

      .supplier-container {

        .supplier-wrapper {
          padding-bottom: 2rem;

          .company-name {
            display: inline;
            margin: 0 0 2px 0;
            font-weight: @font-weight-medium;
            font-size: 19px;

            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
          #verified-mark {
            padding-left: 5px;
            font-size: 15px;
            color: @color-light-green;
          }
          .website {
            margin: @margin;
            font-weight: @font-weight-medium;
            font-size: 14px;
            color: @color-link;
          }
          .product {
            margin: @margin;
            font-weight: @font-weight-thin;
            font-size: 16px;
            /*white-space: nowrap;*/
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
            display: -webkit-box;
            -webkit-line-clamp: 2; /* 라인수 */
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .phone {
            margin: @margin;
            font-weight: @font-weight-thin;
            font-size: 14px;
          }
          .address {
            margin: @margin;
            font-weight: @font-weight-medium;
            font-size: 14px;
          }
        }
      }

      .pagination {
        margin: 0;
        padding: 0;
        display: flex;

        li {
          background-color: @color-white;
          color: @color-link;
          font-size: @font-size-small;
          display: flex;
          justify-content: center;
          align-items: center;
          list-style-type: none;
          width: 38px;
          height: 38px;
          border: 1px solid @color-light-gray;

          &:hover {
            cursor: pointer;
            border: 1px solid @color-link;
            background-color: @color-link;
            color: @color-white;
          }

          &.selected {
            cursor: pointer;
            border: 1px solid @color-link;
            background-color: @color-link;
            color: @color-white;
          }
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    #container {

    }
  }
  @media ( min-width: 1128px ) {
    #container {

      .supplier-container {
        padding-right: 350px;
      }
    }
  }
</style>
