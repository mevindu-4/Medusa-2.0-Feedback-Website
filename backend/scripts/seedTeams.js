import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Team from '../models/Team.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medusa-feedback'

const sampleTeams = [
  { teamId: 'TEAM-001', teamName: 'Team Alpha' },
  { teamId: 'TEAM-002', teamName: 'Team Beta' },
  { teamId: 'TEAM-003', teamName: 'Team Gamma' },
  { teamId: 'TEAM-004', teamName: 'Team Delta' },
  { teamId: 'TEAM-005', teamName: 'Team Epsilon' },
  { teamId: 'TEAM-006', teamName: 'Team Zeta' }
]

async function seedTeams() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing teams (optional - comment out if you want to keep existing)
    // await Team.deleteMany({})
    // console.log('🗑️  Cleared existing teams')

    // Insert or update teams
    for (const team of sampleTeams) {
      const existingTeam = await Team.findOne({ teamId: team.teamId })
      if (!existingTeam) {
        await Team.create(team)
        console.log(`✅ Created team: ${team.teamId} - ${team.teamName}`)
      } else {
        // Update existing team name if different
        if (existingTeam.teamName !== team.teamName) {
          existingTeam.teamName = team.teamName
          await existingTeam.save()
          console.log(`🔄 Updated team: ${team.teamId} - ${team.teamName}`)
        } else {
          console.log(`⏭️  Team already exists: ${team.teamId}`)
        }
      }
    }

    console.log('\n🎉 Seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding teams:', error)
    process.exit(1)
  }
}

seedTeams()

