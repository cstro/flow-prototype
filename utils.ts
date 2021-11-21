export const hexToRgb = (hex: string, alpha?: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const color = alpha
    ? `rgba(${r}, ${g}, ${b}, ${alpha})`
    : `rgb(${r}, ${g}, ${b})`;

  // if (color.includes('NaN')) return null;

  return color;
}

export const getColor = (color: string, opacity: number) => {
  return hexToRgb(color, opacity);
  // let gradient;
  // if (colors[0] !== null && colors[1] !== null) {
  //   const fromRgba = hexToRgb(colors[0], opacity);
  //   const toRgba = hexToRgb(colors[1], opacity) || fromRgba;
  //   gradient = ctx.createLinearGradient(0, 0, height, 0);
  //   gradient.addColorStop(0, fromRgba);
  //   gradient.addColorStop(1, toRgba);
  //   ctx.fillStyle = gradient;
  // } else if (colors[0] !== null) {
  //   ctx.fillStyle = hexToRgb(colors[0], opacity);
  // }
}
