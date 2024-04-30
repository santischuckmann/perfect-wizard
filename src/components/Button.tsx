import { ButtonProps, Button as MUIButton } from '@mui/material'

export const Button = (props: ButtonProps) => {
  return (
    <MUIButton {...props} sx={{ textTransform: 'capitalize' }}>
      {props.children}
    </MUIButton>
  )
}