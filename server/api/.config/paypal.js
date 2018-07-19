const isProduction = process.env.NODE_ENV

const PAYPAL_BASE_API = isProduction ? 'https://api.paypal.com' : 'https://api.sandbox.paypal.com'

const CLIENT = isProduction
  ? 'AQLW9aeKK8uD0SqlNTwAYm0BeWaeCezkimQzigjGfBQSgaLOnaz5hpJBBwW-knS46YPbOsPF_mNqjNus'
  : 'AdGD-i0u1GhlvK2wtk33UMHjE6gxE9fLUi7gOJjO-LNmsfkD4CP9mGda00nfJvEe-F4U5PGqT3XlJiWR'
const SECRET = isProduction
  ? 'EFzoWxM1Rvdem9vRyKVf0m7Hwx0Hbonsy-sELNKRFCwqG-sjR7R_PvmssH5PF8kA2JCER56QQn7wQZNE '
  : 'ENm3b_HcgBK7zpXH0_HhSyQmNiUYvpNvmweXh7segbxJZ6U7oI6gYyICb_-UCTRUHtk3qTHO2Kc-1wA0'
const STANDARD_PAY_AMOUNT = isProduction ? '100' : '0.01'

module.exports = { PAYPAL_BASE_API, CLIENT, SECRET, STANDARD_PAY_AMOUNT }
