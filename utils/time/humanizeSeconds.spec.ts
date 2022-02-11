import humanizeSeconds from './humanizeSeconds'

describe('humanizeSeconds', () => {
  it('displays seconds as minutes and seconds', () => {
    expect(humanizeSeconds(6)).toBe('00:06')
  })

  it('displays zero correctly', () => {
    expect(humanizeSeconds(0)).toBe('00:00')
  })

  it('displays 59 seconds correctly', () => {
    expect(humanizeSeconds(59)).toBe('00:59')
  })

  it('displays 61 seconds correctly', () => {
    expect(humanizeSeconds(61)).toBe('01:01')
  })
})
