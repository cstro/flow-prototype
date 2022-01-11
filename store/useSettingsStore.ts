import create, { GetState, SetState } from 'zustand'
import { devtools, persist, StoreApiWithPersist } from 'zustand/middleware'

type SettingsStore = {
  focusDuration: number
  breakDuration: number
}

const useSettingsStore = create<
  SettingsStore,
  SetState<SettingsStore>,
  GetState<SettingsStore>,
  StoreApiWithPersist<SettingsStore>
>(
  persist(
    devtools(() => ({
      focusDuration: 25,
      breakDuration: 5,
    })),
    {
      name: 'app-storage',
      version: 1,
      partialize: () => ({}),
    }
  )
)

export default useSettingsStore
