export function createSelectionObj<T extends string[]>(...paths: T) {
  return Object.fromEntries(paths.map((path) => [path, true])) as {
    [K in T[number]]: true
  }
}
