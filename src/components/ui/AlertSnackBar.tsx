import { Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'

export default function AlertSnackBar({ text }: AlertSnackBarProps) {
  const [open, setOpen] = useState(false)
  const [alertText, setAlertText] = useState(text || '')
  useEffect(() => {
    setOpen(!!text)
    text && setAlertText(text)
  }, [text])

  function handleClose(event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled">
        {alertText}
      </Alert>
    </Snackbar>
  )
}

type AlertSnackBarProps = {
  text: any
}
