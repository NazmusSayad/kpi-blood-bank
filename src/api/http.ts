import ReactHTTP from 'react-net-kit'

const server =
  // @ts-ignore
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8000'
    : 'https://blood-api.sayad.dev'

console.log('Server URL: ', server)
const http = ReactHTTP({ baseURL: server + '/api' })
export const { useApi, useApiOnce, createSuspense } = http
export default http
