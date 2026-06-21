import { motion } from 'framer-motion'

function MedusaLogo({ className = 'h-16 md:h-20 w-auto' }) {
  return (
    <motion.img
      src="/medusa-logo.png"
      alt="Medusa 2.0"
      className={`${className} mx-auto select-none`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      draggable={false}
    />
  )
}

export default MedusaLogo
