import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = 'medusa-feedback'

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined')
  throw new Error('MONGODB_URI environment variable is not set. Please configure it in your Vercel environment variables.')
}

// Ensure database name is in the connection string
function ensureDatabaseInUri(uri) {
  // Check if URI already has a database name (pattern: /database-name? or /database-name at end)
  const dbNamePattern = /\/([^/?]+)(\?|$)/
  if (dbNamePattern.test(uri)) {
    // Replace existing database name with our target database
    return uri.replace(/\/[^/?]+(\?|$)/, `/${DB_NAME}$1`)
  }
  
  // If no database in URI, add it before query parameters
  if (uri.includes('?')) {
    return uri.replace('?', `/${DB_NAME}?`)
  } else {
    return `${uri}/${DB_NAME}`
  }
}

const connectionUri = ensureDatabaseInUri(MONGODB_URI)

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
      dbName: DB_NAME, // Also set as option for redundancy
    }

    cached.promise = mongoose.connect(connectionUri, opts).then((mongoose) => {
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

