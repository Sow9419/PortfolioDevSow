"use client"

import React, { useEffect, useRef } from "react"

export default function DotGrid({ colorFill = "#333", gap = 20, size = 1 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const draw = () => {
      const width = canvas.width = canvas.offsetWidth
      const height = canvas.height = canvas.offsetHeight
      
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = colorFill
      
      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          // Slight randomization for "shader" organic feel
          const r = Math.random()
          if (r > 0.9) continue; 
          
          const s = size + (Math.random() * 0.5)
          
          ctx.beginPath()
          ctx.arc(x, y, s, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    
    // Draw once for static background, or loop for animation. 
    // Static is better for performance and matches subtle texture look.
    draw()
    
    const handleResize = () => draw()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [colorFill, gap, size])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: 0.3 }} />
}