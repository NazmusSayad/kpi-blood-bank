import { Button } from '@mui/material'
import AlertSnackBar from '@/components/ui/AlertSnackBar'

export default function ForgetPassLayout({ children, button, handler, error, loading }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handler()
      }}
    >
      {children}

      <div className={'mb-2'}>
        <Button fullWidth variant={'contained'} type={'submit'} disabled={!!loading}>
          {button}
        </Button>
      </div>

      <AlertSnackBar text={error} />
    </form>
  )
}
