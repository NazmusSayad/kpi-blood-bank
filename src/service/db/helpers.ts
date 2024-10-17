export function createSelectDBObj<T extends string[]>(...paths: T) {
  return Object.fromEntries(paths.map((path) => [path, true])) as {
    [K in T[number]]: true
  }
}

export function selectInObj<T extends Record<string, unknown>>(
  object: T,
  keys: readonly string[] | string[]
): Pick<T, (typeof keys)[number]> {
  const result: any = {}
  keys.forEach((key) => {
    result[key] = object[key]
  })

  return result
}
