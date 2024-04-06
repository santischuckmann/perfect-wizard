import { useParams } from 'react-router-dom'
import { useDataFetching } from '../../hooks'
import { Wizard as WizardType } from '../../shared'
import { Wizard } from '../../containers/Wizard'

export const WizardView = () => {
  const params = useParams()
  const wizard = useDataFetching<WizardType>(`client/${params.wizardId}`)

  if (wizard.data == null)
    return null

  return <Wizard wizard={wizard.data} />
}