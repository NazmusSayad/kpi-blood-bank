export type OmitPartials<T> = {
  [K in keyof T as null extends T[K] ? never : K]: T[K]
}

export type Prettify<T> = {
  [Key in keyof T]: T[Key]
} & {}
