import getTimeLeft from './getTimeLeft'

const date = '2021-01-01'

describe('getTimeLeft', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date(`${date} 11:00:00`).getTime())
  })

  it('handles minutes being zero', () => {
    const endTime = new Date(`${date} 11:00:10`)

    expect(getTimeLeft(endTime)).toEqual({
      minutes: 0,
      seconds: 10,
    })
  })

  it('handles end time is in the future', () => {
    const endTime = new Date(`${date} 11:15:30`)

    expect(getTimeLeft(endTime)).toEqual({
      minutes: 15,
      seconds: 30,
    })
  })

  it('handles negative time left', () => {
    const endTime = new Date(`${date} 10:45:20`)

    expect(getTimeLeft(endTime)).toEqual({
      minutes: -14,
      seconds: -40,
    })
  })

  it('handles only negative seconds left', () => {
    const endTime = new Date(`${date} 10:59:50`)

    expect(getTimeLeft(endTime)).toEqual({
      minutes: -0,
      seconds: -10,
    })
  })

  it('handles minutes and seconds as zero', () => {
    const endTime = new Date(`${date} 11:00:00`)

    expect(getTimeLeft(endTime)).toEqual({
      minutes: 0,
      seconds: 0,
    })
  })
})
