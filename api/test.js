import connectDB from './db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  const diagnostics = {
    message: 'API is working',
    timestamp: new Date().toISOString(),
    env: {
      hasMongoUri: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV
    },
    mongoConnection: null
  }
  
  // Test MongoDB connection
  if (process.env.MONGODB_URI) {
    try {
      await connectDB()
      diagnostics.mongoConnection = {
        status: 'connected',
        message: 'MongoDB connection successful'
      }
    } catch (error) {
      diagnostics.mongoConnection = {
        status: 'error',
        message: error.message
      }
    }
  } else {
    diagnostics.mongoConnection = {
      status: 'missing',
      message: 'MONGODB_URI environment variable is not set'
    }
  }
  
  return res.status(200).json(diagnostics)
}

