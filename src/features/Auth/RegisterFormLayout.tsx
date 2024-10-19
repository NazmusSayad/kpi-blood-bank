import { cn } from '@/utils'
import { Button } from '@mui/material'
import LinkButton from '@/components/ui/LinkButton'

export default function RegisterFormLayout({
  handler,
  children,
  button,
  error,
}: RegisterFormLayoutProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handler()
      }}
    >
      {children}

      <div className={'mb-2 mt-4'}>
        <Button fullWidth variant={'contained'} type={'submit'}>
          {button}
        </Button>
      </div>

      {error && <p className={'text-red-500 text-center'}>{error}</p>}

      <div>
        <p className={'text-center text-sm'}>
          Already have an account?{' '}
          <LinkButton size={'small'} href="/auth/login">
            Login
          </LinkButton>
        </p>
      </div>
    </form>
  )
}

type RegisterFormLayoutProps = {
  handler: () => void
  button: string
  children: React.ReactNode
  error?: string
}
