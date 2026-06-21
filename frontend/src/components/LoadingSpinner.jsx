import { motion } from 'framer-motion'

function LoadingSpinner({ size = 'medium' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className={`${sizeClasses[size]} border-2 border-medusa-500/20 border-t-medusa-500`}
        />
      </motion.div>
    </div>
  )
}

export default LoadingSpinner
