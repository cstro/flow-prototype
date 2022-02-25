import React, { useEffect, useRef, useState } from 'react'
import spline from '@/utils/spline'
import SimplexNoise from 'simplex-noise'

const simplex = new SimplexNoise()

const noiseStep = 0.003

type Point = {
  x: number
  y: number

  originX: number
  originY: number

  noiseOffsetX: number
  noiseOffsetY: number
}

function noise(x: number, y: number) {
  return simplex.noise2D(x, y)
}

type AnimatingBlobProps = {
  bg: string
  paused?: boolean
}

const AnimatingBlob = React.memo((props: AnimatingBlobProps) => {
  const [points] = useState<Point[]>(createPoints())

  const { bg, paused = false } = props

  const pathRef = useRef<SVGPathElement>(null)
  const animation = useRef<number>(0)

  useEffect(() => {
    function animate() {
      if (!paused) {
        pathRef.current?.setAttribute('d', spline(points, 1, true))

        for (let i = 0; i < points.length; i++) {
          const point = points[i]

          const nX = noise(point.noiseOffsetX, point.noiseOffsetX)
          const nY = noise(point.noiseOffsetY, point.noiseOffsetY)

          const x = map(nX, -1, 1, point.originX - 5, point.originX + 5)
          const y = map(nY, -1, 1, point.originY - 5, point.originY + 5)

          point.x = x
          point.y = y

          point.noiseOffsetX += noiseStep
          point.noiseOffsetY += noiseStep
        }
      }

      animation.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animation.current)
  }, [paused])

  return (
    <div>
      <svg
        viewBox="0 0 200 200"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <path ref={pathRef} fill={bg} />
      </svg>
    </div>
  )
})

AnimatingBlob.displayName = 'AnimatingBlob'

function createPoints() {
  const points = []

  const numPoints = 8

  const angleStep = (Math.PI * 2) / numPoints

  const rad = 90

  for (let i = 1; i <= numPoints; i++) {
    const theta = i * angleStep

    const x = 100 + Math.cos(theta) * rad
    const y = 100 + Math.sin(theta) * rad

    points.push({
      x: x,
      y: y,

      originX: x,
      originY: y,

      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
    })
  }
  return points
}

function map(
  n: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
}

export default AnimatingBlob
