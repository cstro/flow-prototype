export type Time = {
  minutes: number
  seconds: number
}

export enum TimerStatus {
  tracking,
  paused,
  off,
}
