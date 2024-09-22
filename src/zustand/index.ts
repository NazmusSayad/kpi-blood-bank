import { create } from 'zustand'

export const useZustandStore = create<{ count: number }>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))
