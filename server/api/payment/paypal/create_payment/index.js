const { STANDARD_PAY_AMOUNT, PAYPAL_BASE_API, CLIENT, SECRET } = require('../../../.config/paypal')
const request = require('request')

// /api/payment/paypal/create_payment
module.exports = async (req, res) => {
  const PAYPAL_URL = `${PAYPAL_BASE_API}/v1/payments/payment`

  const createPayment = () => {
    return new Promise((resolve, reject) => {
      const payload = {
        auth: { user: CLIENT, pass: SECRET },
        body: {
          intent: 'sale',
          payer: { payment_method: 'paypal' },
          transactions: [{ amount: { total: STANDARD_PAY_AMOUNT, currency: 'USD' } }],
          redirect_urls: {
            return_url: 'https://www.factoryhunt.com/verification/pricing',
            cancel_url: 'https://www.factoryhunt.com/verification/pricing?success=false'
          }
        },
        json: true
      }

      request.post(PAYPAL_URL, payload, (err, response) => {
        if (err) reject(err)

        resolve(response)
      })
    })
  }

  try {
    const response = await createPayment()
    res.json({ id: response.body.id })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}
