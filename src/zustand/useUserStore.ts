import { create } from 'zustand'
import { http } from '@/api/http'
import config, { PrivateUser } from '@/config'
import { combine } from 'zustand/middleware'

const initialState = {
  user: null as PrivateUser | null,
  authToken: null as string | null,
} as const

export default create(
  combine({ ...initialState }, (set) => ({
    authenticate(user: PrivateUser, authToken: string) {
      http.axios.defaults.headers.common[config.headerAuthTokenKey] = `Bearer ${authToken}`
      set((state) => ({
        ...state,
        user,
        authToken,
      }))
    },

    setUser(user: PrivateUser) {
      set((state) => ({ ...state, user }))
    },

    updateUser(user: PrivateUser) {
      set((state) => ({ ...state, user: { ...state.user, ...user } }))
    },

    clear() {
      http.axios.defaults.headers.common[config.headerAuthTokenKey] = undefined
      set({ ...initialState })
    },
  }))
)
