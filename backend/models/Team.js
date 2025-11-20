import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  teamName: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

const Team = mongoose.model('Team', teamSchema)

export default Team

