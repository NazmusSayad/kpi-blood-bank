import { appRoute, authRoute } from '@/router/api'

export type AppHandler = Parameters<typeof appRoute>[number]
export type AuthHandler = Parameters<typeof authRoute>[number]
