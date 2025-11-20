import connectDB from '../db.js'
import Feedback from '../models/Feedback.js'
import Team from '../models/Team.js'

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

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await connectDB()

    const { teamId, rating, message, teamName } = req.body

    // Validation
    if (!teamId || !teamId.trim()) {
      return res.status(400).json({
        message: 'Team ID is required'
      })
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: 'Rating must be between 1 and 5'
      })
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: 'Feedback message is required'
      })
    }

    // Verify team exists
    const team = await Team.findOne({
      teamId: teamId.trim().toUpperCase()
    })

    if (!team) {
      return res.status(404).json({
        message: 'Team ID not found'
      })
    }

    // Create feedback
    const feedback = new Feedback({
      teamId: teamId.trim().toUpperCase(),
      rating: parseInt(rating),
      message: message.trim(),
      teamName: teamName?.trim() || team.teamName,
      createdAt: new Date()
    })

    await feedback.save()

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: {
        _id: feedback._id,
        teamId: feedback.teamId,
        rating: feedback.rating,
        message: feedback.message,
        teamName: feedback.teamName,
        createdAt: feedback.createdAt
      }
    })
  } catch (error) {
    console.error('Error creating feedback:', error)
    res.status(500).json({
      message: 'Server error while creating feedback'
    })
  }
}

