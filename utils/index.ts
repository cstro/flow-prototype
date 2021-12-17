export const hexToRgb = (hex: string, alpha?: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const color = alpha
    ? `rgba(${r}, ${g}, ${b}, ${alpha})`
    : `rgb(${r}, ${g}, ${b})`

  return color
}

export const getColor = (color: string, opacity: number) => {
  return hexToRgb(color, opacity)
}
