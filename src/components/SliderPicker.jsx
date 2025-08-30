import React, { useState, useEffect, useRef } from 'react'

const SliderPicker = ({ 
  options, 
  value, 
  onChange, 
  label,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef(null)
  const itemHeight = 40 // 每个选项的高度

  useEffect(() => {
    if (value && options.length > 0) {
      const index = options.indexOf(value)
      if (index !== -1) {
        scrollToIndex(index)
      }
    }
  }, [value, options])

  const scrollToIndex = (index) => {
    if (containerRef.current) {
      const scrollPosition = index * itemHeight
      containerRef.current.scrollTop = scrollPosition
    }
  }

  const handleScroll = () => {
    if (containerRef.current && !isDragging) {
      const scrollTop = containerRef.current.scrollTop
      const index = Math.round(scrollTop / itemHeight)
      const clampedIndex = Math.max(0, Math.min(index, options.length - 1))
      
      if (options[clampedIndex] && options[clampedIndex] !== value) {
        onChange(options[clampedIndex])
      }
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartY(e.clientY)
    setScrollTop(containerRef.current.scrollTop)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const y = e.clientY
    const walk = (y - startY) * 2
    containerRef.current.scrollTop = scrollTop - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    handleScroll()
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    setScrollTop(containerRef.current.scrollTop)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const y = e.touches[0].clientY
    const walk = (y - startY) * 2
    containerRef.current.scrollTop = scrollTop - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(handleScroll, 100) // 延迟一点执行，确保滚动完成
  }

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-text-primary font-medium mb-2 text-center">
          {label}
        </label>
      )}
      
      <div className="relative bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
        {/* 选中指示器 */}
        <div 
          className="absolute left-0 right-0 bg-yellow-100 border-y-2 border-yellow-400 pointer-events-none z-10"
          style={{
            top: '50%',
            height: `${itemHeight}px`,
            transform: 'translateY(-50%)'
          }}
        />
        
        {/* 渐变遮罩 */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
        
        {/* 滚动容器 */}
        <div
          ref={containerRef}
          className="h-40 overflow-y-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{
            paddingTop: `${itemHeight * 2}px`,
            paddingBottom: `${itemHeight * 2}px`
          }}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center justify-center text-center transition-all duration-200 select-none ${
                option === value 
                  ? 'text-yellow-600 font-bold text-lg' 
                  : 'text-gray-600 text-base'
              }`}
              style={{ height: `${itemHeight}px` }}
              onClick={() => {
                onChange(option)
                scrollToIndex(index)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SliderPicker
