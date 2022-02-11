const humanizeSeconds = (totalSeconds: number) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, '0')

  return `${minutes}:${seconds}`
}

export default humanizeSeconds
