import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import MedusaLogo from '../components/MedusaLogo'
import CtfPanel from '../components/CtfPanel'
import CtfButton from '../components/CtfButton'
import StarRating from '../components/StarRating'
import LoadingSpinner from '../components/LoadingSpinner'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function VerifyTeam() {
  const [teams, setTeams] = useState([])
  const [teamsLoading, setTeamsLoading] = useState(true)
  const [teamId, setTeamId] = useState('')
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselectedTeam = searchParams.get('team')?.toUpperCase() || ''

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${API_URL}/teams/all`)
        setTeams(response.data)
        if (preselectedTeam) {
          const match = response.data.find((t) => t.teamId === preselectedTeam)
          if (match) setTeamId(match.teamId)
        }
      } catch (err) {
        setError('Failed to load teams. Please refresh and try again.')
        console.error('Error fetching teams:', err)
      } finally {
        setTeamsLoading(false)
      }
    }

    fetchTeams()
  }, [preselectedTeam])

  const selectedTeam = teams.find((t) => t.teamId === teamId)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!teamId) {
      setError('Please select your team.')
      return
    }

    if (rating === 0) {
      setError('Rating required. Select 1-5 stars.')
      return
    }

    if (!message.trim()) {
      setError('Please enter your review.')
      return
    }

    setLoading(true)

    try {
      await axios.post(`${API_URL}/feedback/create`, {
        teamId,
        rating,
        message: message.trim(),
        teamName: selectedTeam?.teamName,
      })

      navigate('/', { replace: true })
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to submit review. Please try again.'
      )
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative z-10 flex items-center justify-center px-6 py-12 pb-16"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        className="max-w-2xl w-full relative z-10"
      >
        <div className="logo-glow mb-8">
          <MedusaLogo className="h-10 w-auto" />
        </div>

        <CtfPanel title="submit_feedback.sh">
          <div className="p-8">
            <div className="mb-8">
              <p className="text-medusa-400 text-xs tracking-widest mb-2">
                {'> SUBMIT YOUR REVIEW'}
              </p>
              <p className="text-gray-600 text-xs">
                {'// select your team and share your experience'}
              </p>
            </div>

            {teamsLoading ? (
              <div className="flex flex-col items-center py-12 gap-3">
                <LoadingSpinner />
                <p className="text-xs text-gray-600 tracking-widest">LOADING_TEAMS...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <label htmlFor="teamId" className="ctf-label">
                    Select Team <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="teamId"
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                    required
                    className="ctf-select"
                    disabled={loading || teams.length === 0}
                  >
                    <option value="">-- choose your team --</option>
                    {teams.map((team) => (
                      <option key={team.teamId} value={team.teamId}>
                        {team.teamName} ({team.teamId})
                      </option>
                    ))}
                  </select>
                  {selectedTeam && (
                    <p className="text-[10px] text-medusa-500 mt-2 tracking-widest">
                      {'> ID: '}{selectedTeam.teamId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="ctf-label">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="py-4 px-4 bg-yellow-400/5 border border-yellow-400/20">
                    <StarRating
                      rating={rating}
                      onRate={setRating}
                      size="lg"
                      showScore
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="ctf-label">
                    Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts about MEDUSA 2.0 - ECSC..."
                    required
                    rows={5}
                    className="ctf-input resize-none"
                    disabled={loading}
                  />
                </div>

                {error && <div className="ctf-error">{error}</div>}

                <div className="flex gap-3 pt-2">
                  <CtfButton
                    type="button"
                    variant="ghost"
                    className="flex-1"
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    abort
                  </CtfButton>
                  <CtfButton
                    type="submit"
                    className="flex-1"
                    disabled={loading || !teamId || rating === 0 || !message.trim()}
                  >
                    {loading ? <LoadingSpinner size="small" /> : 'submit review >>'}
                  </CtfButton>
                </div>
              </form>
            )}
          </div>
        </CtfPanel>
      </motion.div>
    </motion.div>
  )
}

export default VerifyTeam
