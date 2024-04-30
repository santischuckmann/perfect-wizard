import { Box, Typography } from '@mui/material'
import { Description } from '../shared'
import React, { ComponentPropsWithRef } from 'react'

interface FieldProps extends ComponentPropsWithRef<'div'> {
  description: Description | null
  label: React.ReactNode;
  children: React.ReactNode;
}

export const Field = ({
  description,
  label,
  children,
  ...props
}: FieldProps) => {
  return (
    <Box {...props}>
      {label}
      {description && description?.position === 'ABOVE' &&
       <Typography sx={{ fontSize: '1.8rem' }} color='secondary' className="description">{description.text}</Typography>}
      {children}
      {description && description?.position === 'BELOW' &&
       <Typography sx={{ fontSize: '1.8rem' }} color='secondary' className="description">{description.text}</Typography>}
    </Box>
  )
}