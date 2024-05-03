import { Typography } from '@mui/material'
import { OperationStatus } from '../hooks'
import React, { useMemo } from 'react'

export const WizardWrapper = ({
  status,
  children
}: { status: typeof OperationStatus[keyof typeof OperationStatus], children: React.ReactNode}) => {
  const content = useMemo(() => {
    switch (status) {
    case 'LOADING':
      return (
        <Typography variant='h3'>
            Seeing if you made any mistake...
        </Typography>
      )
    case 'ERROR': 
      return (
        <Typography variant='h3'>
          The information given was incorrect. Try again.
        </Typography>
      )
    case 'SUCCESS':
      return (
        <Typography variant='h3'>
          The wizard has been completed succesfully! 
          Thanks for using Perfect Wizard.
        </Typography>
      )
    default:
      return <Typography>WTF!</Typography>
    }
  }, [ status ])

  return (
    <div className='screen-container'>
      {status === 'IDLE' ? children : content}
    </div>
  )
}