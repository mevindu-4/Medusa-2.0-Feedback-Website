import connectDB from '../db.js'
import Feedback from '../models/Feedback.js'

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

    res.json(feedbacks)
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    res.status(500).json({
      message: 'Server error while fetching feedbacks'
    })
  }
}

