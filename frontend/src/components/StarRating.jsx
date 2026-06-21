import { motion } from 'framer-motion'

function StarRating({ rating, onRate, max = 5, size = 'md', showScore = false, disabled = false }) {
  const sizeClasses = {
    sm: 'text-xl gap-0.5',
    md: 'text-3xl gap-1',
    lg: 'text-4xl gap-2',
  }

  const interactive = typeof onRate === 'function'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1
          const filled = starValue <= rating

          const star = (
            <span
              className={`leading-none transition-all duration-200 ${
                filled
                  ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]'
                  : 'text-gray-600'
              } ${interactive && !disabled ? 'hover:text-yellow-300 hover:scale-110 cursor-pointer' : ''}`}
            >
              {filled ? '★' : '☆'}
            </span>
          )

          if (interactive) {
            return (
              <motion.button
                key={starValue}
                type="button"
                onClick={() => onRate(starValue)}
                whileHover={{ scale: disabled ? 1 : 1.2 }}
                whileTap={{ scale: disabled ? 1 : 0.9 }}
                className="focus:outline-none disabled:cursor-not-allowed"
                disabled={disabled}
                aria-label={`Rate ${starValue} out of ${max}`}
              >
                {star}
              </motion.button>
            )
          }

          return <span key={starValue}>{star}</span>
        })}
      </div>
      {showScore && rating > 0 && (
        <span className="text-xs text-yellow-400/90 tracking-widest font-bold">
          {rating}/{max}
        </span>
      )}
    </div>
  )
}

export default StarRating
