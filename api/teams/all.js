import connectDB from '../db.js'
import Team from '../models/Team.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await connectDB()

    const teams = await Team.find()
      .select('teamId teamName')
      .sort({ teamId: 1 })

    return res.status(200).json(teams)
  } catch (error) {
    console.error('Error fetching teams:', error)
    return res.status(500).json({ message: 'Server error while fetching teams' })
  }
}
