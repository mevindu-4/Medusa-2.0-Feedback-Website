import { motion } from 'framer-motion'

function CtfButton({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'relative overflow-hidden font-mono font-bold py-3 px-6 tracking-widest uppercase text-xs focus:outline-none transition-colors'

  const variants = {
    primary:
      'border-2 border-medusa-500 text-medusa-400 hover:bg-medusa-500 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed',
    ghost:
      'border border-medusa-500/30 text-medusa-400 hover:bg-medusa-500/10 hover:border-medusa-500 disabled:opacity-40 disabled:cursor-not-allowed',
  }

  return (
    <motion.button
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: props.disabled ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled ? 1 : 0.98 }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  )
}

export default CtfButton
