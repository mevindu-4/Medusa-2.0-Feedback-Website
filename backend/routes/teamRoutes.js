import express from 'express'
import Team from '../models/Team.js'

const router = express.Router()

// POST /api/auth/verify-team
router.post('/verify-team', async (req, res) => {
  try {
    const { teamId } = req.body

    if (!teamId || !teamId.trim()) {
      return res.status(400).json({
        valid: false,
        message: 'Team ID is required'
      })
    }

    const team = await Team.findOne({
      teamId: teamId.trim().toUpperCase()
    })

    if (team) {
      res.json({
        valid: true,
        team: {
          teamId: team.teamId,
          teamName: team.teamName
        }
      })
    } else {
      res.status(404).json({
        valid: false,
        message: 'Invalid Team ID'
      })
    }
  } catch (error) {
    console.error('Error verifying team:', error)
    res.status(500).json({
      valid: false,
      message: 'Server error while verifying team'
    })
  }
})

export default router

