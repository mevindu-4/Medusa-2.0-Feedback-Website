import express from 'express'
import Team from '../models/Team.js'

const router = express.Router()

// GET /api/teams/all
router.get('/all', async (req, res) => {
  try {
    const teams = await Team.find()
      .select('teamId teamName')
      .sort({ teamId: 1 })

    res.json(teams)
  } catch (error) {
    console.error('Error fetching teams:', error)
    res.status(500).json({ message: 'Server error while fetching teams' })
  }
})

export default router
