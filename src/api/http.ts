import ReactNetKit from 'react-net-kit'

export const http = ReactNetKit({ baseURL: '/api' })
export const { useApi, useApiOnce, createSuspense } = http
