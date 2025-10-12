import  { createBrowserRouter} from 'react-router-dom'
import Layout from './Layout'
import { Clients } from './pages/Clients'
import Sales from './pages/Sales'
import Comptes from './pages/Comptes'


const Router = createBrowserRouter([
    {
        
        element: <Layout />,
        children: [
            {
                path:'/',
                element:<Clients />
            },
            {
                path:'sales',
                element:<Sales />
            },
            {
                path:'comptes',
                element:<Comptes />
            },
           
        ]

    },
                 {
                     path: '/login',
                     lazy: () => import('./pages/LoginPage').then(module => ({ Component: module.default })),
                 },
                 {
                     path: '/register',
                     lazy: () => import('./pages/RegisterPage').then(module => ({ Component: module.default })),
                 }
     ])
export default Router