import { useDataFetching } from '../../hooks'
import { MinifiedWizardDto } from '../../shared'
import { WizardTable } from '../../containers/admin/WizardTable'
import { useParams } from 'react-router-dom'

export const Wizards = () => {
  const params = useParams()
  const wizards = useDataFetching<MinifiedWizardDto[]>(`wizard?tenantId=${params.tenantId}`)

  if (wizards.status === 'ERROR')
    return <div>There was an error loading this page</div>

  return (
    <WizardTable wizards={wizards.data}/>
  )
}
