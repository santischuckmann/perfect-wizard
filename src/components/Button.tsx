import { ButtonProps, Button as MUIButton } from '@mui/material'

export const Button = (props: ButtonProps) => {
  return (
    <MUIButton {...props}>
      {props.children}
    </MUIButton>
  )
}