const { STANDARD_PAY_AMOUNT, PAYPAL_BASE_API, CLIENT, SECRET } = require('../../../.config/paypal')
const request = require('request')

// /api/payment/paypal/execute_payment
module.exports = async (req, res) => {
  const { paymentID, payerID } = req.body
  const PAYPAL_URL = `${PAYPAL_BASE_API}/v1/payments/payment/${paymentID}/execute`

  const executePayment = () => {
    return new Promise((resolve, reject) => {
      const payload = {
        auth: {
          user: CLIENT,
          pass: SECRET
        },
        body: {
          payer_id: payerID,
          transactions: [
            {
              amount: {
                total: STANDARD_PAY_AMOUNT,
                currency: 'USD'
              }
            }
          ]
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
    await executePayment()
    res.status(200).json({ msg: 'PayPal checkout is successfully done.' })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}
