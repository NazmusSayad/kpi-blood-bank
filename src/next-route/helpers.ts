import { ErrorManager } from 'req-error'

export const errorManager = new ErrorManager()

export type NextRequestContext = Record<string, unknown> & {
  readonly params: Record<string, string>
  status: number
  authorizationToken?: string
}
