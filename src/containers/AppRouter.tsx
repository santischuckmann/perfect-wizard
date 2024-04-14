import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { WizardView } from '../views/client/WizardView'
import { Layout } from './Layout'
import { Login } from '../views/dashboard/Login'
import { TenantSelection } from '../views/dashboard/TenantSelection'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/:wizardId',
        element: <WizardView />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'admin',
        element: <TenantSelection />
      }
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}