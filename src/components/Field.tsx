import { Box, Typography } from '@mui/material'
import { Description } from '../shared'
import React, { ComponentPropsWithRef } from 'react'

interface FieldProps extends ComponentPropsWithRef<'div'> {
  description: Description | null
  children: React.ReactNode;
}

export const Field = ({
  description,
  children,
  ...props
}: FieldProps) => {
  return (
    <Box {...props} display='flex' flexDirection={description?.position === 'ABOVE' ? 'column' : 'column-reverse'}>
      {description && <Typography className="description">{description.text}</Typography>}
      {children}
    </Box>
  )
}