import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Team from '../models/Team.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medusa-feedback'

// Update this array with your teams
const teams = [
  { teamId: 'TEAM-001', teamName: 'Team Alpha' },
  { teamId: 'TEAM-002', teamName: 'Team Beta' },
  { teamId: 'TEAM-003', teamName: 'Team Gamma' },
  { teamId: 'TEAM-004', teamName: 'Team Delta' },
  { teamId: 'TEAM-005', teamName: 'Team Epsilon' },
  // Add more teams here
  // { teamId: 'TEAM-006', teamName: 'Team Zeta' },
]

async function updateTeams() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Process each team
    for (const team of teams) {
      const existingTeam = await Team.findOne({ teamId: team.teamId })
      
      if (existingTeam) {
        // Update existing team
        existingTeam.teamName = team.teamName
        await existingTeam.save()
        console.log(`🔄 Updated team: ${team.teamId} - ${team.teamName}`)
      } else {
        // Create new team
        await Team.create(team)
        console.log(`✅ Created team: ${team.teamId} - ${team.teamName}`)
      }
    }

    console.log('\n🎉 Teams update completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating teams:', error)
    process.exit(1)
  }
}

updateTeams()

