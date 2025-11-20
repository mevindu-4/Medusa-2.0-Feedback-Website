import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function VerifyTeam() {
  const [teamId, setTeamId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/auth/verify-team`, {
        teamId: teamId.trim()
      })

      if (response.data.valid) {
        navigate(`/feedback/${teamId.trim()}`)
      } else {
        setError('Invalid Team ID. Please check and try again.')
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to verify team. Please try again.'
      )
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
      className="min-h-screen relative z-10 flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-black/40 backdrop-blur-sm border border-medusa-500/30 p-10 cyber-border relative overflow-hidden"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-medusa-500"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-medusa-500"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-medusa-500"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-medusa-500"></div>
          
          {/* Header */}
          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-medusa-500 mb-6 relative">
              <svg
                className="w-10 h-10 text-medusa-400 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight cyber-text">
              Team Verification
            </h2>
            <p className="text-gray-400 font-light">
              Enter your Team ID to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="teamId"
                className="block text-sm font-medium text-medusa-400 mb-3 tracking-wide uppercase text-xs"
              >
                Team ID
              </label>
              <input
                type="text"
                id="teamId"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="e.g., TEAM-001"
                required
                className="w-full px-4 py-3 bg-black/50 border border-medusa-500/30 text-white placeholder-gray-500 focus:ring-2 focus:ring-medusa-500 focus:border-medusa-500 outline-none transition-all font-light"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-950 border-l-4 border-red-500 text-red-400 px-4 py-3 text-sm">
                {error}
              </div>
            )}

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
                disabled={loading || !teamId.trim()}
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
                      <span>Verify</span>
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

export default VerifyTeam

