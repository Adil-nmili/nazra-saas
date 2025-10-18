import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import { Clients } from './pages/Clients'
import Sales from './pages/Sales'
import Comptes from './pages/Comptes'
import CustomerDetails from './pages/CustomerDetails'
import PlansSubscriptions from './pages/PlansSubscriptions'
import HistoryPage from './pages/HistoryPage'
import RevenueCharts from './pages/RevenueCharts'

import { MAINDASHBOARD, DASHBOARDCLIENTS, COMPTES, COMPTESBYID, SUBSCRIPTIONS, HISTORY, REVENUECHART, KPIS, LOGIN, SYSTEMEHEALTH, QUICKACTIONS, CUSTOMERSPROFILES, USERMANAGEMENT, CUSTOMERSSEGMENTATIONS, PRICINGPERTEIRS, PAYMENTPROCESSING, GENERALSETTING } from './constant/routeConstants'
import KeyMetricsDashboard from './pages/KeyMetricsDashboard'
import LoginPage from './pages/LoginPage'
import SystemHealthStatus from './pages/SystemHealthStatus'
import QuickActionsPanel from './pages/QuickActionsPanel'
import CustomersList from './pages/CustomersList'
import CustomerProfile from './pages/CustomerProfile'
import UserManagement from './pages/UserManagement'
import CustomerSegmentation from './pages/CustomerSegmentation'
import PricingTiers from './pages/PricingTiers'
import PaymentProcessing from './pages/PaymentProcessing'
import GeneralSettings from './pages/GeneralSettings'



const Router = createBrowserRouter([
    {
        path: LOGIN,
        element: <LoginPage />
    },
    {


        element: <Layout />,
        children: [
            {
                path: DASHBOARDCLIENTS,
                element: <CustomersList />
            },
            {
                path: CUSTOMERSPROFILES,
                element: <CustomerProfile />
            },
            {
                path: MAINDASHBOARD,
                element: <Sales />
            },
            {
                path: COMPTES,
                element: <Comptes />
            },
            {
                path:COMPTESBYID ,
                element: <CustomerDetails />
            },
            {
                path: USERMANAGEMENT,
                element: <UserManagement />
            },
            {
                path: CUSTOMERSSEGMENTATIONS,
                element: <CustomerSegmentation />
            },
            {
                path: SUBSCRIPTIONS,
                element : <PlansSubscriptions />
            },
            {
                path: HISTORY,
                element: <HistoryPage />
            },
            {
                path: REVENUECHART,
                element: <RevenueCharts />
            },{
                path: PRICINGPERTEIRS,
                element: <PricingTiers />
            },
            {
                path: PAYMENTPROCESSING,
                element: <PaymentProcessing />
            },
            {
                path:KPIS,
                element:< KeyMetricsDashboard/>
            },
            {
                path: SYSTEMEHEALTH,
                element: <SystemHealthStatus />
            },
            {
                path: QUICKACTIONS,
                element: <QuickActionsPanel />
            },
            {
                path:GENERALSETTING,
                element: <GeneralSettings />
            }

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