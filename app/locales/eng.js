const home = require('./home/eng'),
  navigationBar = require('./navigationBar/eng'),
  footerBar = require('./footerBar/eng'),
  about = require('./about/eng'),
  contact = require('./contact/eng'),
  terms = require('./terms/eng'),
  privacy = require('./privacy/eng'),
  login = require('./login/eng'),
  dashboard = require('./dashboard/index/eng'),
  dashboardCompany = require('./dashboard/company/eng'),
  dashboardProduct = require('./dashboard/product/eng'),
  dashboardProductEdit = require('./dashboard/productEdit/eng'),
  dashboardMyAccount = require('./dashboard/myAccount/eng'),
  company = require('./_company/eng'),
  product = require('./_company/_product/eng'),
  search = require('./search/eng'),
  alert = require('./alert/eng'),
  forSupplier = require('./for-supplier/eng')

export default {
  home,
  navigationBar,
  footerBar,
  about,
  contact,
  terms,
  privacy,
  login,
  dashboard,
  dashboardCompany,
  dashboardProduct,
  dashboardProductEdit,
  dashboardMyAccount,
  company,
  product,
  search,
  alert,
  forSupplier
}
