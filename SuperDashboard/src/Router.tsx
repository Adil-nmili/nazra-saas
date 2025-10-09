import  { createBrowserRouter} from 'react-router-dom'
import Layout from './Layout'
import { Clients } from './pages/Clients'
import Sales from './pages/Sales'


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
            }
        ]

    }
])

export default Router