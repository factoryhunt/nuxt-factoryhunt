const home = require('./home/eng'),
  navigationBar = require('./navigationBar/eng'),
  footerBar = require('./footerBar/eng'),
  about = require('./about/eng'),
  contact = require('./contact/eng'),
  terms = require('./terms/eng'),
  privacy = require('./privacy/eng'),
  login = require('./login/eng'),
  signUp = require('./signUp/eng'),
  dashboard = require('./dashboard/index/eng'),
  dashboardCompany = require('./dashboard/company/eng'),
  dashboardProduct = require('./dashboard/product/eng'),
  dashboardProductEdit = require('./dashboard/productEdit/eng'),
  dashboardInbox = require('./dashboard/inbox/eng'),
  dashboardMyAccount = require('./dashboard/myAccount/eng'),
  company = require('./_company/eng'),
  product = require('./_company/_product/eng'),
  search = require('./search/eng'),
  alert = require('./alert/eng'),
  supplier = require('./supplier/eng'),
  forSupplier = require('./for-supplier/eng'),
  inquiry = require('./inquiry/eng'),
  pricing = require('./pricing/eng'),
  verification = require('./verification/eng')

export default {
  home,
  navigationBar,
  footerBar,
  about,
  contact,
  terms,
  privacy,
  login,
  signUp,
  dashboard,
  dashboardCompany,
  dashboardProduct,
  dashboardProductEdit,
  dashboardInbox,
  dashboardMyAccount,
  company,
  product,
  search,
  alert,
  supplier,
  forSupplier,
  inquiry,
  pricing,
  verification
}
