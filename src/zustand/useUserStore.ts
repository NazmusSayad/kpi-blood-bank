import { create } from 'zustand'
import { http } from '@/api/http'
import { PrivateUser } from '@/config'
import { combine } from 'zustand/middleware'

export default create(
  combine(
    {
      user: null as PrivateUser | null,
      authToken: null as string | null,
    },
    (set) => ({
      authenticate(user: PrivateUser, authToken: string) {
        http.axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${authToken}`
        set((state) => ({
          ...state,
          user,
          authToken,
        }))
      },

      setUser(user: PrivateUser) {
        set((state) => ({ ...state, user }))
      },

      putUser(user: PrivateUser) {
        set((state) => ({ ...state, user: { ...state.user, ...user } }))
      },

      clearUser() {
        set((state) => ({ ...state, user: null }))
      },
    })
  )
)
