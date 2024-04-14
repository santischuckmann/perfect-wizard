import { Tenant } from '../../shared'
import { useNavigate } from 'react-router-dom'

interface TenantListProps {
  tenants: Tenant[]
}

export const TenantList = ({ tenants }: TenantListProps ) => {
  const navigate = useNavigate()
  const handleSelectTenant = (tenantId: string) => {
    navigate(`admin/${tenantId}`)
  }

  return (
    <ul>
      {tenants.map((tenant) => (
        <li onClick={() => handleSelectTenant(tenant.tenantId)} key={tenant.tenantId}>{tenant.name}</li>
      ))}
    </ul>
  )
}