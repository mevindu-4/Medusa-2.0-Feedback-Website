import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = 'medusa-feedback'

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined')
  throw new Error('MONGODB_URI environment variable is not set. Please configure it in your Vercel environment variables.')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      dbName: DB_NAME, // Explicitly set database name
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log(`✅ MongoDB connected to database: ${DB_NAME}`)
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error)
      cached.promise = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('❌ Failed to connect to MongoDB:', e.message)
    throw e
  }

  return cached.conn
}

export default connectDB

