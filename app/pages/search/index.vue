<template>
  <section id="container">

    <filter-bar 
      id="filter-bar"
      :countries="countries"/>

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
            itemscope 
            itemtype="http://schema.org/Thing"
            itemprop="item"> 
                <span itemprop="name">Categories</span>
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
            itemscope 
            itemtype="http://schema.org/Thing"
            itemprop="item">
                <span itemprop="name">{{largeCategory}}</span>
            </a>
            <meta itemprop="position" content="2"/>
          </li>
          <span v-show="middleCategory" class="separator">›</span>
          <li 
          itemscope 
          itemtype="http://data-vocabulary.org/Breadcrumb">
            <a 
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
          <!-- Search Results -->
          <div class="flex">
            <div class="supplier-container">
              <div 
                class="supplier-wrapper" 
                v-for="(account,index) in accounts" 
                :key="index">
                <div class="header">
                  <h1 
                    class="company-name" 
                    @click="routeSupplierPage(account._source)">{{account._source.account_name}}</h1>
                  <div class="tag-wrapper">
                    <!-- Verified -->
                    <div 
                      class="tooltip"
                      v-if="account._source.membership_left_time">
                      <img 
                        class="tag verified"
                        src="~assets/icons/star.svg" 
                        alt="verified">
                      <div class="tooltip-label">Premium Supplier</div>
                    </div>
                    <!-- Powered -->
                    <span 
                        v-if="account._source.membership_left_time && index < 2"
                        class="tag powered">Powered</span>
                </div>
                </div>
                <h3 class="website">{{account._source.website}}</h3>
                <h2 
                  class="product" 
                  v-html="account.highlight ? account.highlight.products[0] : account._source.products"></h2>
                <h3 class="phone">{{account._source.phone}}</h3>
                <h3 class="address">{{account._source.mailing_country}}</h3>
              </div>
            </div>

            <!-- Promotion -->
            <div class="promotion-container">
              <promotion/>
            </div>
          </div>
          <!-- Pagination -->
          <ul class="pagination" role="navigation" >
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
import FilterBar from '~/components/SearchFilterBar'
import Loader from '~/components/Loader'
import Promotion from './components/Promotion'
import axios from '~/plugins/axios'
import { Inflectors } from 'en-inflectors'
import synonyms from 'synonyms'
import { addComma, removeNullInArray } from '~/utils/text'
import { getSearchQuery } from '~/utils/elastic'
export default {
  scrollToTop: true,
  layout: 'minify',
  components: {
    FilterBar,
    Loader,
    Promotion
  },
  head() {
    return {
      title: `${this.getTitle}`,
      meta: [
        { hid: 'description', name: 'description', content: this.getDescription },
        { hid: 'og-title', property: 'og:title', content: `${this.getTitle} | Factory Hunt` },
        { hid: 'og-description', property: 'og:description', content: this.getDescription },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `ttps://www.factoryhunt.com/search?q=${this.queryOptions.q}`
        },
        {
          hid: 'twitter-title',
          property: 'twitter:title',
          content: `${this.getTitle} | Factory Hunt`
        },
        {
          hid: 'twitter-description',
          property: 'twitter:description',
          content: this.getDescription
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.factoryhunt.com/search?q=${this.queryOptions.q}`
        }
      ]
    }
  },
  async asyncData({ query, redirect }) {
    if (!query.q) redirect('/')

    const options = {
      q: query.q,
      page: 0,
      category: parseInt(query.category) === 1,
      country: query.country || ''
    }

    const queryURI = getSearchQuery(options)
    try {
      let { data } = await axios.get(queryURI)
      return {
        queryOptions: options,
        largeCategory: data.categories.large_category,
        middleCategory: data.categories.middle_category,
        accounts: data.hits.hits,
        account_count: data.hits.total,
        countries: data.aggregations.countries.buckets
      }
    } catch (err) {
      return {
        queryOptions: options,
        accounts: {},
        account_count: 0,
        countries: []
      }
    }
  },
  data() {
    return {
      structuredData: {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': 'https://example.com/books',
              name: 'Books',
              image: 'http://example.com/images/icon-book.png'
            }
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': 'https://example.com/books/authors',
              name: 'Authors',
              image: 'http://example.com/images/icon-author.png'
            }
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@id': 'https://example.com/books/authors/annleckie',
              name: 'Ann Leckie',
              image: 'http://example.com/images/author-leckie-ann.png'
            }
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@id': 'https://example.com/books/authors/ancillaryjustice',
              name: 'Ancillary Justice',
              image: 'http://example.com/images/cover-ancillary-justice.png'
            }
          }
        ]
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
    getTitle() {
      let title = this.queryOptions.q

      if (this.queryOptions.category) {
        const category = this.middleCategory ? this.middleCategory : this.largeCategory
        title = category
      }

      if (this.queryOptions.country) {
        const country = this.queryOptions.country
        title = `${country} ${title}`
      }

      title = `${title} Manufacturers, Suppliers & Wholesalers Directory`

      return title
    },
    getDescription() {
      const { q: query, country } = this.queryOptions

      const keyword_1 = country ? `${country} ${query}` : query
      const keyword_2 = country ? `accross ${country}` : ''

      const desc = `Search here ${keyword_1} manufacturers, wholesale suppliers & exporters. Get contact details of companies manufacturing and supplying ${keyword_2} in our directory.`

      return desc
    },
    getAccountCount() {
      return addComma(this.account_count)
    },
    doesCategoryExist() {
      if (!this.queryOptions.category) return false
      if (this.largeCategory) return true
      if (this.middleCategory) return true

      return false
    },
    isLastPage() {
      const pagination = Math.ceil(this.account_count / 15 / 10)
      return this.page < pagination - 1
    }
  },
  methods: {
    isApprovedAccount(account) {
      return account._source.account_status === 'approved'
    },
    routeSupplierPage(account) {
      if (account.account_status === 'approved') {
        const url = account.domain
        window.open(`/${url}?q=${this.queryOptions.q}`)
      } else {
        window.open(`/supplier/${account.domain}?q=${this.queryOptions.q}`)
      }
    },
    highlightMatchedText() {
      let keyword = new Inflectors(this.queryOptions.q)
      // console.log('singular', keyword.toSingular())
      // console.log('plural', keyword.toPlural())
      // console.log('synonyms with search keyword: ', synonyms(this.queryOptions.q, 'n'))

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
    async onPagination(index) {
      // clean local datas
      window.scrollTo(0, 0)
      this.activateLoader()
      this.accounts = {}
      this.selected = index

      let options = this.queryOptions
      options.page = index
      const uri = getSearchQuery(options)
      let { data } = await axios.get(uri)
      this.accounts = data.hits.hits
      this.deactivateLoader()
    },
    moveNextPage() {
      if (this.page <= this.account_count / this.PAGE_ITEM_NUMBER) {
        this.page = this.page + 1
        this.selected = 0
        this.onPagination(this.page * this.PAGINATION_NUMBER)
      }
    },
    movePreviousPage() {
      if (this.page > 0) {
        this.page = this.page - 1
        this.selected = 0
        this.onPagination(this.page * this.PAGINATION_NUMBER)
      }
    },
    activateLoader() {
      $(document).ready(() => {
        const $loader = $('#loader')
        $loader.removeClass().addClass('spinkit-default')
      })
    },
    deactivateLoader() {
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
  margin-bottom: 7px;

  li {
    display: inline-block;
    font-size: 14px;
    cursor: auto;
  }

  a {
    color: @color-font-gray;
    text-decoration: none;
    cursor: inherit;
  }

  .separator {
    padding-left: 7px;
    padding-right: 7px;
  }
}

#container {
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

    .flex {
      @media (min-width: 1128px) {
        display: flex;
      }
    }

    .supplier-container {
      @media (min-width: 1128px) {
        flex: 1;
      }

      .supplier-wrapper {
        padding-top: 2rem;

        &:first-child {
          padding-top: 0;
        }

        .header {
          display: inline-block;
          vertical-align: middle;
        }
        .company-name {
          display: inline-block;
          vertical-align: middle;
          margin: 0;
          font-weight: @font-weight-medium;
          font-size: 19px;

          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .tag-wrapper {
          margin-left: 4px;
          display: inline-block;

          .tag {
            display: inline-block;
            vertical-align: middle;
            border: 1px solid @color-border-gray;
            border-radius: @border-radius;
            background-color: @color-white;
            padding: 3px 4px;
            font-size: 12px;
            margin-left: 6px;

            &:first-child {
              margin-left: 0;
            }
          }
          .tooltip {
            position: relative;
            display: inline-block;

            &:hover {
              cursor: help;
              .tooltip-label {
                visibility: visible;
              }
            }
          }
          .verified {
            border: 0;
            background-color: @color-white;
            border-radius: 50%;
            // padding: 3px;
            overflow: hidden;
            width: 24px;
            height: 24px;
          }
          .tooltip-label {
            visibility: hidden;
            position: absolute;
            white-space: nowrap;
            bottom: 100%;
            left: 0;
            padding: 8px;
            border-radius: @border-radius;
            border: 1px solid @color-border-gray;
            background-color: @color-bg-gray;
            box-shadow: 0 1px 1px @color-light-gray;
            font-size: 15px;
          }
          .powered {
            border-color: @color-link;
            background-color: @color-white;
            font-weight: 500;
            color: @color-link;
            text-transform: uppercase;
            cursor: default !important;
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

    .promotion-container {
      padding-top: 2rem;

      @media (min-width: 1128px) {
        padding-top: 0;
        padding-left: 2rem;
        width: 350px;
      }
    }

    .pagination {
      margin: 2rem 0 0 0;
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
</style>
