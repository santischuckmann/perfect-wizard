import { useDataFetching } from '../../hooks'
import { CreateTenant } from '../../containers/tenant/CreateTenant'
import { TenantList } from '../../containers/tenant/TenantList'
import { Tenant } from '../../shared'
import { Box } from '@mui/material'


export const TenantSelection = () => {
  const tenants = useDataFetching<Tenant[]>('tenant')

  if (tenants.status === 'ERROR')
    return <div>There was an error loading this page</div>

  return (
    <Box className='login-container'>
      <h1>Tenants</h1>
      {tenants.data?.length === 0 && (
        <CreateTenant />
      )}
      {tenants.data !== null && (tenants.data?.length ?? 0) > 0 && (
        <TenantList tenants={tenants.data} />
      )}
    </Box>
  )
}
