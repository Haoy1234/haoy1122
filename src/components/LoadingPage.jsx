import React from 'react'

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-bg">
      {/* 太极图动画 */}
      <div className="relative mb-8">
        <div className="w-24 h-24 animate-spin">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* 太极图外圆 */}
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="white"
              stroke="#684a2e"
              strokeWidth="2"
            />
            
            {/* 黑色半圆 */}
            <path
              d="M 50 2 A 48 48 0 0 1 50 98 A 24 24 0 0 1 50 50 A 24 24 0 0 0 50 2"
              fill="#684a2e"
            />
            
            {/* 白色小圆 */}
            <circle
              cx="50"
              cy="26"
              r="12"
              fill="white"
            />
            
            {/* 黑色小圆 */}
            <circle
              cx="50"
              cy="74"
              r="12"
              fill="#684a2e"
            />
          </svg>
        </div>
      </div>

      {/* 加载文字 */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-text-primary mb-2">小友请耐心等待</h2>
        <p className="text-text-secondary text-sm">黄小仙正在为您分析八字...</p>
        
        {/* 加载点动画 */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-text-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-text-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-text-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
