import { forwardRef, HTMLProps } from 'react'

const ChimeSound = forwardRef<HTMLAudioElement>(
  (props: HTMLProps<HTMLAudioElement>, ref) => {
    return <audio ref={ref} src="/sounds/chime.mp3" {...props} />
  }
)

ChimeSound.displayName = 'ChimeSound'

export default ChimeSound
