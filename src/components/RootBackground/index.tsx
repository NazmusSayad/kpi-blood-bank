'use client'

import CanvasMatrix from './canvas-matrix'
import { useLayoutEffect, useRef } from 'react'
import Particles from './Particles'

export default function RootBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rain = new CanvasMatrix(canvas, {
      characters: '.',
      colors: ['#f00'],
      background: '#eee',
      delay: 200,
    })

    rain.play()
    return () => rain.stop()
  }, [])

  return (
    <div className={'fixed inset-0 z-[-999] bg-red-100'}>
      <div className={'absolute inset-0 opacity-10'}>
        <canvas ref={canvasRef} className={'size-full'} />
      </div>

      <div className={'absolute inset-0 opacity-20'}>
        <Particles />
      </div>
    </div>
  )
}
