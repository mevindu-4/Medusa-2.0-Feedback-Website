import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import FeedbackCard from '../components/FeedbackCard'
import LoadingSpinner from '../components/LoadingSpinner'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function Home() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchFeedbacks()
    // Poll for new feedbacks every 5 seconds
    const interval = setInterval(fetchFeedbacks, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_URL}/feedback/all`)
      // Sort by newest first (createdAt descending)
      const sorted = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
      setFeedbacks(sorted)
      setError(null)
    } catch (err) {
      setError('Failed to load feedbacks. Please try again later.')
      console.error('Error fetching feedbacks:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen relative z-10"
    >
      <div className="container mx-auto px-6 py-16 max-w-7xl relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter cyber-text relative"
          >
            <span className="relative z-10">MEDUSA 2.0</span>
          </motion.h1>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl font-light text-medusa-400 mb-6 tracking-widest uppercase relative"
          >
            <span className="relative z-10">Feedback Wall</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-lg font-light max-w-2xl mx-auto"
          >
            Share your experience with us
          </motion.p>
        </motion.header>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-16"
        >
          <motion.button
            onClick={() => navigate('/verify')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-medusa-500 text-medusa-400 hover:bg-medusa-500 hover:text-white font-bold py-4 px-12 focus:outline-none tracking-widest uppercase text-sm relative overflow-hidden group"
          >
            <motion.span
              className="relative z-10 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span>Give Feedback</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-medusa-500"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%', skewX: -12 }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 1 }}
            />
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-950 border-l-4 border-red-500 text-red-400 px-6 py-4 mb-8 text-center max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Feedbacks Grid */}
        {!loading && !error && (
          <>
            {feedbacks.length === 0 ? (
              <div className="text-center py-24">
                <div className="inline-block p-8 border-2 border-dashed border-medusa-500/30">
                  <p className="text-gray-400 text-lg font-light">
                    No feedbacks yet. Be the first to share your thoughts!
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {feedbacks.map((feedback, index) => (
                  <motion.div
                    key={feedback._id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <FeedbackCard feedback={feedback} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default Home

