import { create } from 'zustand'
import { http } from '@/api/http'
import { User } from '@prisma/client'

export const useUserStore = create<{
  user?: User
  authToken?: string
  authenticate: (user: User, authToken: string) => void
  setUser: (user: User) => void
  putUser: (user: Partial<User>) => void
  clearUser: () => void
}>((set) => ({
  user: undefined,
  authToken: undefined,

  authenticate(user, authToken) {
    http.axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
    set((state) => ({
      ...state,
      user,
      authToken,
    }))
  },

  setUser(user) {
    set((state) => ({ ...state, user }))
  },

  putUser(user) {
    set((state) => ({ ...state, user: { ...state.user, ...user } }))
  },

  clearUser() {
    set((state) => ({ ...state, user: undefined }))
  },
}))
