import create, { GetState, SetState } from 'zustand'
import { devtools, persist, StoreApiWithPersist } from 'zustand/middleware'

type SettingsStore = {
  focusDuration: number
  breakDuration: number
  debugOverlay: boolean
  toggleDebugOverlay: () => void
}

const useSettingsStore = create<
  SettingsStore,
  SetState<SettingsStore>,
  GetState<SettingsStore>,
  StoreApiWithPersist<SettingsStore>
>(
  persist(
    devtools((set, get) => ({
      focusDuration: 25 * 60,
      breakDuration: 5 * 60,
      debugOverlay: false,
      toggleDebugOverlay: () => {
        set({ debugOverlay: !get().debugOverlay })
      },
    })),
    {
      name: 'settings',
      version: 1,
    }
  )
)

export default useSettingsStore
