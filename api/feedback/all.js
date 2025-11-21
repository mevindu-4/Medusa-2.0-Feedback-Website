import connectDB from '../db.js'
import Feedback from '../models/Feedback.js'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await connectDB()

    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 }) // Newest first
      .limit(100) // Limit to prevent overwhelming response

    // Return feedbacks with diagnostic info in development
    if (process.env.NODE_ENV === 'development') {
      return res.status(200).json({
        feedbacks,
        count: feedbacks.length,
        database: mongoose.connection.db?.databaseName || 'unknown',
        connectionState: mongoose.connection.readyState
      })
    }

    return res.status(200).json(feedbacks)
  } catch (error) {
    console.error('❌ Error fetching feedbacks:', error)
    
    // Provide more helpful error messages
    let errorMessage = 'Server error while fetching feedbacks'
    let errorDetails = null
    
    if (error.message.includes('MONGODB_URI')) {
      errorMessage = 'Database configuration error. Please check environment variables.'
      errorDetails = 'MONGODB_URI environment variable is not set in Vercel.'
    } else if (error.message.includes('connection') || error.message.includes('timeout')) {
      errorMessage = 'Database connection failed. Please check your MongoDB connection string.'
      errorDetails = error.message
    } else {
      errorDetails = error.message
    }
    
    return res.status(500).json({
      message: errorMessage,
      error: errorDetails,
      hasMongoUri: !!process.env.MONGODB_URI
    })
  }
}

