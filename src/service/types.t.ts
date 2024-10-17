import { appRoute, authRoute } from '@/api-route'

export type AppHandler = Parameters<typeof appRoute>[number]
export type AuthHandler = Parameters<typeof authRoute>[number]
