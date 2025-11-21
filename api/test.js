import connectDB from './db.js'
import mongoose from 'mongoose'
import Feedback from './models/Feedback.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  const diagnostics = {
    message: 'API is working',
    timestamp: new Date().toISOString(),
    env: {
      hasMongoUri: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV
    },
    mongoConnection: null,
    database: null
  }
  
  // Test MongoDB connection
  if (process.env.MONGODB_URI) {
    try {
      await connectDB()
      diagnostics.mongoConnection = {
        status: 'connected',
        message: 'MongoDB connection successful',
        readyState: mongoose.connection.readyState,
        databaseName: mongoose.connection.db?.databaseName || 'unknown'
      }
      
      // Try to count feedbacks
      try {
        const count = await Feedback.countDocuments()
        diagnostics.database = {
          feedbackCount: count,
          status: 'accessible'
        }
      } catch (dbError) {
        diagnostics.database = {
          status: 'error',
          error: dbError.message
        }
      }
    } catch (error) {
      diagnostics.mongoConnection = {
        status: 'error',
        message: error.message,
        errorType: error.name
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

