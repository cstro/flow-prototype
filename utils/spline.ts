type Point = {
  x: number
  y: number
}

function formatPoints(points: Point[], close: boolean) {
  points = [...points]

  let mappedPoints: number[][] = []

  // so that coords can be passed as objects or arrays
  if (!Array.isArray(points[0])) {
    mappedPoints = points.map(({ x, y }) => [x, y])
  }

  if (close) {
    const lastPoint = mappedPoints[mappedPoints.length - 1]
    const secondToLastPoint = mappedPoints[mappedPoints.length - 2]

    const firstPoint = mappedPoints[0]
    const secondPoint = mappedPoints[1]

    mappedPoints.unshift(lastPoint)
    mappedPoints.unshift(secondToLastPoint)

    mappedPoints.push(firstPoint)
    mappedPoints.push(secondPoint)
  }

  return mappedPoints.flat()
}

function spline(points: Point[] = [], tension = 1, close = false) {
  const mappedPoints = formatPoints(points, close)

  const size = mappedPoints.length
  const last = size - 4

  const startPointX = close ? mappedPoints[2] : mappedPoints[0]
  const startPointY = close ? mappedPoints[3] : mappedPoints[1]

  let path = 'M' + [startPointX, startPointY]

  const startIteration = close ? 2 : 0
  const maxIteration = close ? size - 4 : size - 2
  const inc = 2

  for (let i = startIteration; i < maxIteration; i += inc) {
    const x0 = i ? mappedPoints[i - 2] : mappedPoints[0]
    const y0 = i ? mappedPoints[i - 1] : mappedPoints[1]

    const x1 = mappedPoints[i + 0]
    const y1 = mappedPoints[i + 1]

    const x2 = mappedPoints[i + 2]
    const y2 = mappedPoints[i + 3]

    const x3 = i !== last ? mappedPoints[i + 4] : x2
    const y3 = i !== last ? mappedPoints[i + 5] : y2

    const cp1x = x1 + ((x2 - x0) / 6) * tension
    const cp1y = y1 + ((y2 - y0) / 6) * tension

    const cp2x = x2 - ((x3 - x1) / 6) * tension
    const cp2y = y2 - ((y3 - y1) / 6) * tension

    path += 'C' + [cp1x, cp1y, cp2x, cp2y, x2, y2]
  }

  return path
}

export default spline
