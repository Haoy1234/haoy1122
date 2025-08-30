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
        scrollToIndex(index, false) // 初始化时不需要动画
      }
    }
  }, [value, options])

  // 添加全局事件监听器
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e)
      }
    }

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp()
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, startY, scrollTop])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (handleScroll.timeoutId) {
        clearTimeout(handleScroll.timeoutId)
      }
    }
  }, [])

  const scrollToIndex = (index, smooth = true) => {
    if (containerRef.current) {
      // 计算居中位置：选项位置 - 容器高度的一半 + 选项高度的一半
      const containerHeight = containerRef.current.clientHeight
      const scrollPosition = index * itemHeight - (containerHeight / 2) + (itemHeight / 2)
      
      if (smooth) {
        containerRef.current.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        })
      } else {
        containerRef.current.scrollTop = scrollPosition
      }
    }
  }

  const getCurrentIndex = () => {
    if (!containerRef.current) return 0
    const scrollTop = containerRef.current.scrollTop
    const containerHeight = containerRef.current.clientHeight
    const centerPosition = scrollTop + (containerHeight / 2)
    const index = Math.round(centerPosition / itemHeight)
    return Math.max(0, Math.min(index, options.length - 1))
  }

  const updateCurrentValue = () => {
    const currentIndex = getCurrentIndex()
    if (options[currentIndex] && options[currentIndex] !== value) {
      onChange(options[currentIndex])
    }
  }

  const snapToNearestOption = () => {
    if (containerRef.current) {
      const currentIndex = getCurrentIndex()
      scrollToIndex(currentIndex, true)
      updateCurrentValue()
    }
  }

  // 处理原生滚动事件（鼠标滚轮、触摸板等）
  const handleScroll = () => {
    if (!isDragging) {
      // 延迟更新值，避免滚动过程中频繁触发
      clearTimeout(handleScroll.timeoutId)
      handleScroll.timeoutId = setTimeout(() => {
        updateCurrentValue()
        snapToNearestOption()
      }, 150)
    }
  }

  // 鼠标拖拽事件
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setStartY(e.clientY)
    setScrollTop(containerRef.current.scrollTop)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const y = e.clientY
    const deltaY = startY - y
    const newScrollTop = scrollTop + deltaY
    containerRef.current.scrollTop = newScrollTop
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      setTimeout(snapToNearestOption, 100)
    }
  }

  // 触摸事件
  const handleTouchStart = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    setScrollTop(containerRef.current.scrollTop)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const y = e.touches[0].clientY
    const deltaY = startY - y
    const newScrollTop = scrollTop + deltaY
    containerRef.current.scrollTop = newScrollTop
  }

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false)
      setTimeout(snapToNearestOption, 100)
    }
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
          className="absolute left-0 right-0 bg-yellow-100 bg-opacity-50 border-y-2 border-yellow-400 border-opacity-60 pointer-events-none z-10"
          style={{
            top: '50%',
            height: `${itemHeight}px`,
            transform: 'translateY(-50%)'
          }}
        />
        
        {/* 渐变遮罩 */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white from-0% via-white via-30% to-transparent to-100% opacity-80 pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white from-0% via-white via-30% to-transparent to-100% opacity-80 pointer-events-none z-20" />
        
        {/* 滚动容器 */}
        <div
          ref={containerRef}
          className="h-40 overflow-y-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{
            paddingTop: `${80}px`, // 容器高度的一半 - 选项高度的一半 (160/2 - 40/2 = 60, 增加一些缓冲)
            paddingBottom: `${80}px`
          }}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
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
                scrollToIndex(index, true)
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
