import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { IconButton, TextField, TextFieldProps } from '@mui/material'

export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      {...props}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              size={'small'}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </IconButton>
          ),
        },
      }}
    />
  )
}

type PasswordInputProps = TextFieldProps
