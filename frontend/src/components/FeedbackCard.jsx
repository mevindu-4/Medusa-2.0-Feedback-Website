import { motion } from 'framer-motion'
import StarRating from './StarRating'

function FeedbackCard({ feedback, index = 0 }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderStars = (rating) => {
    return (
      <StarRating rating={rating} size="md" showScore />
    )
  }

  const hexId = feedback._id?.slice(-6)?.toUpperCase() || '000000'

  return (
    <motion.div
      whileHover={{ y: -3, borderColor: 'rgba(34, 197, 94, 0.5)' }}
      transition={{ duration: 0.2 }}
      className="ctf-panel p-5 group relative"
    >
      {/* Packet header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-medusa-500/15">
        <div className="flex items-center gap-2 text-[10px] text-gray-600">
          <span className="text-medusa-500">PKT</span>
          <span className="text-medusa-400">#{String(index + 1).padStart(3, '0')}</span>
          <span className="text-gray-700">|</span>
          <span>0x{hexId}</span>
        </div>
        <span className="text-[10px] text-medusa-500/60 tracking-wider">[RX]</span>
      </div>

      <div className="mb-4 py-3 px-3 bg-yellow-400/5 border border-yellow-400/20 rounded-sm relative z-10">
        <div className="flex justify-center">{renderStars(feedback.rating)}</div>
      </div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <h3 className="font-bold text-medusa-100 text-sm mb-1 group-hover:text-medusa-400 transition-colors">
            {feedback.teamName || feedback.teamId}
          </h3>
          <p className="text-[10px] text-medusa-600 tracking-widest">
            {'> ID:'} {feedback.teamId}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-600">{formatDate(feedback.createdAt)}</p>
        </div>
      </div>

      <div className="relative z-10 pl-3 border-l-2 border-medusa-500/30">
        <p className="text-gray-400 leading-relaxed whitespace-pre-wrap text-sm">
          {feedback.message}
        </p>
      </div>
    </motion.div>
  )
}

export default FeedbackCard
