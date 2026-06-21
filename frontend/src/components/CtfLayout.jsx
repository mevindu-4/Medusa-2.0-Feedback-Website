import { useLocation } from 'react-router-dom'

const ROUTE_LABELS = {
  '/': 'feedback_wall.sh',
  '/verify': 'submit_feedback.sh',
}

function CtfLayout({ children }) {
  const location = useLocation()
  const script = location.pathname.startsWith('/feedback/')
    ? 'submit_feedback.sh'
    : ROUTE_LABELS[location.pathname] || 'main.sh'

  return (
    <div className="min-h-screen relative z-10 font-mono">
      <div className="scanlines pointer-events-none" aria-hidden="true" />

      {/* Top status bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-medusa-500/20 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-[10px] md:text-xs text-medusa-500/80 tracking-wider">
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-medusa-500 animate-pulse shadow-glow-green" />
            <span className="text-medusa-400">MEDUSA_CTF</span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span className="text-gray-500 hidden sm:inline">./{script}</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="text-neon-green hidden md:inline">[ SYS.ONLINE ]</span>
            <span className="text-gray-600">v2.0</span>
          </span>
        </div>
      </div>

      <div className="pt-8">{children}</div>

      {/* Bottom status bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-medusa-500/20 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between text-[10px] text-gray-600 tracking-wider">
          <span>0x7F3A // MEDUSA 2.0 - ECSC</span>
          <span className="text-medusa-500/60">
            <span className="blink-cursor text-medusa-400">_</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CtfLayout
