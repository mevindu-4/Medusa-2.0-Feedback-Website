import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Team from '../models/Team.js'
import { teams } from './teamsData.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medusa-feedback'

async function seedTeams() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    for (const team of teams) {
      const existingTeam = await Team.findOne({ teamId: team.teamId })
      if (!existingTeam) {
        await Team.create(team)
        console.log(`✅ Created team: ${team.teamId} - ${team.teamName}`)
      } else if (existingTeam.teamName !== team.teamName) {
        existingTeam.teamName = team.teamName
        await existingTeam.save()
        console.log(`🔄 Updated team: ${team.teamId} - ${team.teamName}`)
      } else {
        console.log(`⏭️  Team already exists: ${team.teamId} - ${team.teamName}`)
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
