import { motion } from 'framer-motion'

function FeedbackCard({ feedback }) {
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
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ))
  }

  return (
    <motion.div
      whileHover={{ y: -5, borderColor: 'rgba(34, 197, 94, 0.6)' }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-sm border border-medusa-500/30 p-6 group relative overflow-hidden"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-medusa-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-medusa-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-medusa-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-medusa-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div>
          <h3 className="font-bold text-white text-base mb-1 tracking-tight group-hover:text-medusa-400 transition-colors cyber-text">
            {feedback.teamName || feedback.teamId}
          </h3>
          <p className="text-xs text-medusa-500 font-light uppercase tracking-wide">{feedback.teamId}</p>
        </div>
        <div className="text-right">
          <div className="text-xl mb-2">{renderStars(feedback.rating)}</div>
          <p className="text-xs text-gray-500 font-light">
            {formatDate(feedback.createdAt)}
          </p>
        </div>
      </div>

      {/* Message */}
      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-light text-sm relative z-10">
        {feedback.message}
      </p>
      
      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-medusa-500/5 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default FeedbackCard

