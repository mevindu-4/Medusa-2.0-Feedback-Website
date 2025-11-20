import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function FeedbackForm() {
  const { teamId } = useParams()
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [teamName, setTeamName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (rating === 0) {
      setError('Please select a rating.')
      return
    }

    if (!message.trim()) {
      setError('Please enter your feedback message.')
      return
    }

    setLoading(true)

    try {
      await axios.post(`${API_URL}/feedback/create`, {
        teamId: teamId.trim(),
        rating,
        message: message.trim(),
        teamName: teamName.trim() || undefined
      })

      // Redirect to home page after successful submission
      navigate('/', { replace: true })
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to submit feedback. Please try again.'
      )
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen relative z-10 flex items-center justify-center px-6 py-12"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-black/40 backdrop-blur-sm border border-medusa-500/30 p-10 cyber-border relative overflow-hidden"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-medusa-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-medusa-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-medusa-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-medusa-500"></div>
          
          {/* Header */}
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight cyber-text relative">
              <span className="relative z-10">Share Your Feedback</span>
            </h2>
            <p className="text-gray-400 font-light">
              Help us improve Medusa 2.0
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-medusa-400 mb-4 tracking-wide uppercase text-xs">
                Rating <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-4 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-5xl focus:outline-none ${
                      star <= rating
                        ? 'text-yellow-400'
                        : 'text-gray-600 hover:text-yellow-300'
                    }`}
                    disabled={loading}
                  >
                    <motion.span
                      animate={star <= rating ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      ★
                    </motion.span>
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-sm text-gray-400 mt-3 font-light">
                  {rating} out of 5 stars
                </p>
              )}
            </div>

            {/* Feedback Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-medusa-400 mb-3 tracking-wide uppercase text-xs"
              >
                Feedback Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts, suggestions, or experiences..."
                required
                rows={6}
                className="w-full px-4 py-3 bg-black/50 border border-medusa-500/30 text-white placeholder-gray-500 focus:ring-2 focus:ring-medusa-500 focus:border-medusa-500 outline-none transition-all resize-none font-light"
                disabled={loading}
              />
            </div>

            {/* Optional Team Name */}
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-medusa-400 mb-3 tracking-wide uppercase text-xs"
              >
                Team Name (Optional)
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Your team name"
                className="w-full px-4 py-3 bg-black/50 border border-medusa-500/30 text-white placeholder-gray-500 focus:ring-2 focus:ring-medusa-500 focus:border-medusa-500 outline-none transition-all font-light"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-950 border-l-4 border-red-500 text-red-400 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="button"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 border border-medusa-500/30 text-medusa-400 hover:bg-medusa-500/10 hover:border-medusa-500 transition-all font-medium tracking-wide uppercase text-xs"
                disabled={loading}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading || rating === 0 || !message.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-transparent border-2 border-medusa-500 text-medusa-400 hover:bg-medusa-500 hover:text-white font-bold py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none tracking-wide uppercase text-xs relative overflow-hidden group"
              >
                <motion.span
                  className="relative z-10 flex items-center justify-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  {loading ? <LoadingSpinner size="small" /> : (
                    <>
                      <span>Submit Feedback</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
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
            </div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default FeedbackForm

