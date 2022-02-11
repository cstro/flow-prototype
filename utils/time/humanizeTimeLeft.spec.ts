import humanizeTimeLeft from './humanizeTimeLeft'

describe('humanizeTimeLeft', () => {
  it('displays the given number of minutes and seconds', () => {
    expect(humanizeTimeLeft({ minutes: 5, seconds: 23 })).toBe('5:23')
  })

  it('pads seconds with a zero if less than 10', () => {
    expect(humanizeTimeLeft({ minutes: 10, seconds: 7 })).toBe('10:07')
  })

  it('handles zero', () => {
    expect(humanizeTimeLeft({ minutes: 0, seconds: 0 })).toBe('0:00')
  })

  it('handles negative numbers', () => {
    expect(humanizeTimeLeft({ minutes: -5, seconds: -30 })).toBe('+ 5:30')
  })

  it('handles negative numbers when less than a minute over', () => {
    expect(humanizeTimeLeft({ minutes: -0, seconds: -20 })).toBe('+ 0:20')
  })
})
