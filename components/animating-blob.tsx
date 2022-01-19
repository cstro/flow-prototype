import { useEffect, useState } from 'react'
import spline from '../utils/spline'
import SimplexNoise from 'simplex-noise'

const points = createPoints()
const simplex = new SimplexNoise()

const noiseStep = 0.00025

function noise(x: number, y: number) {
  return simplex.noise2D(x, y)
}

const AnimatingBlob = (props: { bg: string }) => {
  const { bg } = props
  const [path, setPath] = useState<string>('')

  function animate() {
    setPath(spline(points, 1, true))

    for (let i = 0; i < points.length; i++) {
      const point = points[i]

      const nX = noise(point.noiseOffsetX, point.noiseOffsetX)
      const nY = noise(point.noiseOffsetY, point.noiseOffsetY)

      const x = map(nX, -1, 1, point.originX - 5, point.originX + 15)
      const y = map(nY, -1, 1, point.originY - 5, point.originY + 15)

      point.x = x
      point.y = y

      point.noiseOffsetX += noiseStep
      point.noiseOffsetY += noiseStep
    }

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    animate()
  }, [])

  return (
    <div>
      <svg
        viewBox="0 0 200 200"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <path d={path} fill={bg}></path>
      </svg>
    </div>
  )
}

function createPoints() {
  const points = []

  const numPoints = 7

  const angleStep = (Math.PI * 2) / numPoints

  const rad = 75

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
