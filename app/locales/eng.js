const about = require('./about/eng'),
  terms = require('./terms/eng'),
  privacy = require('./privacy/eng'),
  login = require('./login/eng'),
  navigationBar = require('./navigationBar/eng'),
  home = require('./home/eng'),
  footerBar = require('./footerBar/eng'),
  dashboard = require('./dashboard/index/eng'),
  dashboardCompany = require('./dashboard/company/eng'),
  dashboardProduct = require('./dashboard/product/eng'),
  dashboardProductEdit = require('./dashboard/productEdit/eng'),
  dashboardMyAccount = require('./dashboard/myAccount/eng'),
  company = require('./_company/eng'),
  product = require('./_company/_product/eng'),
  search = require('./search/eng'),
  alert = require('./alert/eng')

export default {
  home,
  footerBar,
  about,
  terms,
  privacy,
  login,
  navigationBar,
  dashboard,
  dashboardCompany,
  dashboardProduct,
  dashboardProductEdit,
  dashboardMyAccount,
  company,
  product,
  search,
  alert
}
