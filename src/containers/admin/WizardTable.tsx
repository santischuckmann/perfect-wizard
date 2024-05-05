import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { MinifiedWizardDto, Wizard as WizardType } from '../../shared'
import { key } from '../../utils'
import { useDataFetching } from '../../hooks'
import { ModalBox } from '../../components/ModalBox'
import { Button } from '../../components/Button'
import { useState } from 'react'

export const WizardTable = ({
  wizards
}: { wizards: MinifiedWizardDto[] | null }) => {
  const wizard = useDataFetching<WizardType>('wizard', true)
  const [ openModal, setOpenModal ] = useState(false)

  const handleClickRow = async (wizardId: string) => {
    await wizard.fetch(`/${wizardId}`)

    if (wizard.status === 'SUCCESS')
      setOpenModal(true)
  }

  return (
    <Box className='wizards-container'>
      <Typography variant='h3'>Wizards</Typography>
      <Button variant='contained' size='small' sx={{ alignSelf: 'start', textTransform: 'revert' }}>+ Create new wizard</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Wizard Title</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Field Amount</TableCell>
              <TableCell align="right">First step name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wizards !== null && wizards.map((row) => (
              <TableRow
                onClick={() => handleClickRow(row.wizardId)}
                key={key()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">{row.screens.reduce((prev, curr) => prev += curr.fieldCount, '')}</TableCell>
                <TableCell align="right">{row.screens[0].stepName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalBox sx={{ width: '50%', backgroundColor: 'white', borderRadius: '0.125rem' }}>
          <div>{wizard.data?.wizardId}</div>
        </ModalBox>
      </Modal>
    </Box>
  )
}