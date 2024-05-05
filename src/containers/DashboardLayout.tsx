import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, Divider, Link } from '@mui/material'
import { Outlet, useParams } from 'react-router-dom'
import { useDataFetching } from '../hooks'
import { Tenant } from '../shared'

const drawerWidth = 200

export const DashboardLayout = () => {
  const params = useParams()
  const tenant = useDataFetching<Tenant>(`tenant/${params.tenantId}`)

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
        <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link variant="h5" className='text-gray-600' href='/' underline='hover'>
            Perfect Wizard
          </Link>
          <Divider variant='middle'/>
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