import { renderHook, act } from '@testing-library/react-hooks'
import useTimer from './useTimer'
import TimerProvider from '@/features/timer/TimerProvider'
import { ReactNode } from 'react'

beforeAll(() => {
  jest.useFakeTimers()
})

test('defaults to state "stopped"', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TimerProvider>{children}</TimerProvider>
  )
  const { result } = renderHook(() => useTimer(), { wrapper })

  expect(result.current.isStopped).toBe(true)
})

test('start() sets the state to running and type to given', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TimerProvider>{children}</TimerProvider>
  )
  const { result } = renderHook(() => useTimer(), { wrapper })

  const twoMins = 120

  act(() => {
    result.current.start(twoMins, 'focus')
  })

  expect(result.current.isFocus).toBe(true)
  expect(result.current.isRunning).toBe(true)
})
