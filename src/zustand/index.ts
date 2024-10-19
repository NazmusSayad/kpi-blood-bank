import { create } from 'zustand'
import { User } from '@prisma/client'
import { http } from '@/api/http'

export const useUserStore = create<{
  user?: User
  authToken?: string
  isLoggedIn: boolean
  authenticate: (user: User, authToken: string) => void
  setUser: (user: User) => void
  putUser: (user: Partial<User>) => void
  clearUser: () => void
  setLoggedIn: (status: boolean) => void
}>((set) => ({
  user: undefined,
  authToken: undefined,
  isLoggedIn: false,

  authenticate(user, authToken) {
    console.log('> User set')
    localStorage.setItem('isLoggedIn', '1')
    http.axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
    set((state) => ({
      ...state,
      user,
      authToken,
      isLoggedIn: true,
    }))
  },

  setUser(user) {
    set((state) => ({ ...state, user }))
  },

  putUser(user) {
    set((state) => ({ ...state, user: { ...state.user, ...user } }))
  },

  clearUser() {
    console.log('> User cleared')
    localStorage.removeItem('isLoggedIn')
    set((state) => ({ ...state, user: null, isLoggedIn: false }))
  },

  setLoggedIn(status) {
    set((state) => ({ ...state, isLoggedIn: status }))
  },
}))
