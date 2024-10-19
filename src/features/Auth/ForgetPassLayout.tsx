import { Button } from '@mui/material'

export default function ForgetPassLayout({ children, button, handler }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handler()
      }}
    >
      {children}

      <div className={'mb-2'}>
        <Button fullWidth variant={'contained'} type={'submit'}>
          {button}
        </Button>
      </div>
    </form>
  )
}
