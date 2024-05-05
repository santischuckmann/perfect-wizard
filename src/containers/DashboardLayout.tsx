import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, Divider, Link, Chip, Avatar, styled } from '@mui/material'
import { Outlet, useParams } from 'react-router-dom'
import { useDataFetching } from '../hooks'
import { Tenant, User } from '../shared'
import { key } from '../utils'

const drawerWidth = 200

const Clickable = styled('div')(({ theme }) => ({
  color: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.grey[100]
  },
  '&[data-selected="true"]': {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.grey[100]
  }
}))

export const DashboardLayout = () => {
  const params = useParams()
  const tenants = useDataFetching<Tenant[]>('tenant')
  const tenant = useDataFetching<Tenant>(`tenant/${params.tenantId}`)
  const user = useDataFetching<User>('user')

  const handleCreateTenant = () => console.log('holissss')

  return (
    <Box display='flex'>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar variant='dense'>
          <Typography variant="h6" noWrap component="div" className='text-gray-100 '>
            {tenant.data?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        anchor='left' 
        variant='permanent'
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            height: '100%',
            padding: '2rem 0' 
          }}>
          <Box sx={{ textAlign: 'center' }}>
            <Link variant="h5" className='text-gray-600' href='/' underline='hover'>
            Perfect Wizard
            </Link>
            <Divider variant='middle'/>
            <Box sx={{ 
              mt: 2,
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'start',
              gap: '1rem'
            }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'end',
                  width: '100%'
                }}>
                <Typography>Pick a tenant</Typography>
                <Box 
                  sx={{
                    backgroundColor: '#ccc',
                    border: '1px solid #bbb',
                    borderRadius: '15%',
                    padding: '0.3rem 1rem'
                  }}
                  role='button' onClick={() => handleCreateTenant()}>+</Box>
              </Box>
              {tenants.data !== null && tenants.data.map((tenant) => (
                <Clickable key={key()} data-selected={tenant.tenantId === params.tenantId}>{tenant.name}</Clickable>
              ))}
            </Box>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            width: '100%' 
          }}>
            <Chip
              sx={{
                width: '70%',
                borderRadius: '5%'
              }}
              avatar={<Avatar alt="Natacha">{user.data?.username[0]}</Avatar>}
              label={user.data?.username}
              variant="outlined"
            />
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', pt: 6 }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}