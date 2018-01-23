const crypto = require('crypto')

export const header = (req, res) => {
  const header = {
    'typ': 'JWT',
    'alg': 'HS256'
  }
  // encode to base64
  const encodedPayload = new Buffer(JSON.stringify(header))
    .toString('base64')
    .replace('=', '')
  res.send(encodedPayload)
  /* Result:
   header: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
   */
}

export const payload = (req, res) => {
  const payload = {
    'iss': 'factoryhunt.com',
    'exp': '1485270000000',
    'https://factoryhunt.com/jwt_claims/is_admin': true,
    'userId': '59',
    'username': 'test'
  }
  // encode to base64
  const encodedPayload = new Buffer(JSON.stringify(payload))
    .toString('base64')
    .replace('=', '')

  res.send(encodedPayload)

  // Result :
  // payload : eyJpc3MiOiJmYWN0b3J5aHVudC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly9mYWN0b3J5aHVudC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiNTkiLCJ1c2VybmFtZSI6InRlc3QifQ
}

export const signature = (req, res) => {
  const encodedHeader = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'
  const encodedPayload = 'eyJpc3MiOiJmYWN0b3J5aHVudC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly9mYWN0b3J5aHVudC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiNTkiLCJ1c2VybmFtZSI6InRlc3QifQ='

  const signature = crypto.createHmac('sha256', 'secret')
    .update(encodedHeader + '.' + encodedPayload)
    .digest('base64')
    .replace('=', '')

  res.send(signature)

  // Result:
  // signature: hUGokrqKtRk7P6nn7f2EKvYO89kt0WrGgT3Iwz/iGoc
}
