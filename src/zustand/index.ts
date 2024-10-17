import { create } from 'zustand'
import { User } from '@prisma/client'

export const useUserStore = create<{
  user: User | null
  isLoggedIn: boolean
  setUser: (user: User) => void
  destroyUser: () => void
  setLoggedIn: (status: boolean) => void
}>((set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user: User) => {
    set((state) => ({ ...state, user, isLoggedIn: true }))
    localStorage.setItem('isLoggedIn', '1')
  },

  destroyUser: () => {
    set((state) => ({ ...state, user: null, isLoggedIn: false }))
    localStorage.removeItem('isLoggedIn')
  },

  setLoggedIn: (status) => {
    set((state) => ({ ...state, isLoggedIn: status }))
  },
}))
