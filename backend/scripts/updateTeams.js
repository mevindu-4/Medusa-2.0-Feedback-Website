import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Team from '../models/Team.js'
import { teams } from './teamsData.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medusa-feedback'

async function updateTeams() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    for (const team of teams) {
      const existingTeam = await Team.findOne({ teamId: team.teamId })

      if (existingTeam) {
        existingTeam.teamName = team.teamName
        await existingTeam.save()
        console.log(`🔄 Updated team: ${team.teamId} - ${team.teamName}`)
      } else {
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
