import { motion } from 'framer-motion'

function QrCodePanel({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.25 }}
      className={`ctf-panel inline-block ${className}`}
    >
      <div className="ctf-panel-header flex items-center gap-2 px-3 py-1.5 border-b border-medusa-500/20 bg-medusa-950/40">
        <span className="text-medusa-500 text-[10px]">┤</span>
        <span className="text-medusa-400 text-[10px] tracking-widest uppercase">scan_access</span>
        <span className="text-medusa-500 text-[10px]">├</span>
      </div>
      <div className="p-4 flex flex-col items-center gap-3">
        <div className="p-2 bg-white border border-medusa-500/30">
          <img
            src="/qr.png"
            alt="QR code to open Medusa 2.0 feedback site"
            className="w-36 h-36 md:w-40 md:h-40 object-contain"
            draggable={false}
          />
        </div>
        <p className="text-[10px] text-gray-500 tracking-widest text-center">
          {'> SCAN TO SUBMIT REVIEW'}
        </p>
      </div>
    </motion.div>
  )
}

export default QrCodePanel
