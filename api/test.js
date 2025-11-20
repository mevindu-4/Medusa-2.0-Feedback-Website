export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  return res.status(200).json({ 
    message: 'API is working',
    timestamp: new Date().toISOString(),
    env: {
      hasMongoUri: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV
    }
  })
}

