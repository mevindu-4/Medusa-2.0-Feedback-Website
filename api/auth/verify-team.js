import connectDB from '../db.js'
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
}

