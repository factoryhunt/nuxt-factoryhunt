const { SESSION_KEY, JWT_SECRET, BUCKET_NAME } = process.env

module.exports = {
  sessionKey: SESSION_KEY || 'YOUR_SESSION_KEY',
  jwtSecret: JWT_SECRET || 'YOUR_JWT_SECRET',
  bucketName: BUCKET_NAME || 'YOUR_BUCKET_NAME'
}
