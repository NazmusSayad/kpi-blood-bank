import { create } from 'zustand'
import { http } from '@/api/http'
import { PrivateUser } from '@/config'

export const useUserStore = create<{
  user?: PrivateUser
  authToken?: string
  authenticate: (user: PrivateUser, authToken: string) => void
  setUser: (user: PrivateUser) => void
  putUser: (user: Partial<PrivateUser>) => void
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
