import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { WizardView } from '../views/client/WizardView'
import { Layout } from './Layout'
import { Login } from '../views/dashboard/Login'

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
      }
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}