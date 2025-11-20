function LoadingSpinner({ size = 'default' }) {
  const sizeClasses = {
    small: 'w-5 h-5',
    default: 'w-8 h-8'
  }

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-2 border-medusa-500/30 border-t-medusa-500 rounded-full animate-spin`}
        ></div>
        <div
          className={`${sizeClasses[size]} border-2 border-transparent border-r-medusa-500/50 rounded-full animate-spin absolute top-0 left-0`}
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        ></div>
      </div>
    </div>
  )
}

export default LoadingSpinner

