import express from 'express'
import Feedback from '../models/Feedback.js'
import Team from '../models/Team.js'

const router = express.Router()

// POST /api/feedback/create
router.post('/create', async (req, res) => {
  try {
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
})

// GET /api/feedback/all
router.get('/all', async (req, res) => {
  try {
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
})

export default router

