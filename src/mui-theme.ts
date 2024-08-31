import { createTheme } from '@mui/material'

export default createTheme({
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      'sans-serif',
    ].join(','),

    fontSize: 15,
  },

  shape: {
    borderRadius: 10,
  },
})
