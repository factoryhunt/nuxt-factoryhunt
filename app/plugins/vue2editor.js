import Vue from 'vue'

if (process.BROWSER_BUILD) {
  const VueEditor = require('vue2-editor')
  Vue.use(VueEditor)
}
