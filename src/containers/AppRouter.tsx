import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { WizardView } from '../views/client/WizardView'
import { Layout } from './Layout'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/:wizardId',
        element: <WizardView />
      },
    ]
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}