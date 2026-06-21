function CtfPanel({ title, children, className = '' }) {
  return (
    <div className={`ctf-panel relative overflow-hidden ${className}`}>
      {title && (
        <div className="ctf-panel-header flex items-center gap-2 px-4 py-2 border-b border-medusa-500/20 bg-medusa-950/40">
          <span className="text-medusa-500 text-xs">┤</span>
          <span className="text-medusa-400 text-xs tracking-widest uppercase">{title}</span>
          <span className="text-medusa-500 text-xs">├</span>
          <span className="flex-1 border-b border-dashed border-medusa-500/10" />
          <span className="text-[10px] text-gray-600">[root@medusa]</span>
        </div>
      )}
      <div className="relative z-10">{children}</div>
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-medusa-500/60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-medusa-500/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-medusa-500/60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-medusa-500/60 pointer-events-none" />
    </div>
  )
}

export default CtfPanel
