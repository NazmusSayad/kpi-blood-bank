export type OmitPartials<T> = {
  [K in keyof T as null extends T[K] ? never : K]: T[K]
}

type T1 = null extends string | null ? 'yes' : 'no'
