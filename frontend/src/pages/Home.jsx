import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import MedusaLogo from '../components/MedusaLogo'
import CtfButton from '../components/CtfButton'
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
    const interval = setInterval(fetchFeedbacks, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_URL}/feedback/all`)
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
      className="min-h-screen relative z-10 pb-10"
    >
      <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 relative"
        >
          <div className="logo-glow mb-6">
            <MedusaLogo className="h-14 md:h-20 w-auto max-w-[90vw]" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-medusa-500/30 bg-black/50 text-xs text-medusa-400 tracking-widest mb-4"
          >
            <span className="text-neon-green">[ LIVE ]</span>
            <span className="text-gray-600">|</span>
            <span>FEEDBACK_WALL</span>
          </motion.div>

        </motion.header>

        {/* CTA */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex justify-center mb-12"
        >
          <CtfButton onClick={() => navigate('/verify')}>
            <span>Execute: submit_review</span>
            <span className="text-medusa-600">&gt;&gt;</span>
          </CtfButton>
        </motion.div>

        {/* Stats bar */}
        {!loading && !error && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 text-xs text-gray-600 border border-medusa-500/15 px-4 py-2 bg-black/40">
              <span>
                <span className="text-medusa-400">PACKETS:</span>{' '}
                <span className="text-white">{feedbacks.length}</span>
              </span>
              <span className="text-medusa-500/30">|</span>
              <span>
                <span className="text-medusa-400">STATUS:</span>{' '}
                <span className="text-neon-green">RECEIVING</span>
              </span>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col justify-center items-center py-20 gap-3">
            <LoadingSpinner />
            <p className="text-xs text-gray-600 tracking-widest">LOADING_PACKETS...</p>
          </div>
        )}

        {error && !loading && (
          <div className="ctf-error text-center max-w-2xl mx-auto mb-8">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {feedbacks.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-block p-8 border border-dashed border-medusa-500/20 bg-black/30">
                  <p className="text-gray-500 text-sm">
                    {'> no packets intercepted yet. be the first to transmit.'}
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {feedbacks.map((feedback, index) => (
                  <motion.div
                    key={feedback._id}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <FeedbackCard feedback={feedback} index={index} />
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
