import React from 'react'

export default function RateLimitedUI({ onRetry }) {
  return (
    <div className="alert alert-warning shadow-lg mb-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
        <span>
          You're being rate-limited. Please wait a few moments and try again.
        </span>
      </div>
      {onRetry && (
        <div className="flex-none">
          <button className="btn btn-sm btn-outline" onClick={onRetry}>Retry</button>
        </div>
      )}
    </div>
  )
}


