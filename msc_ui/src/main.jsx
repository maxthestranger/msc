import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

// context
import { AuthProvider } from "./contexts/AuthContext"

// pages
import Index from './pages/index'
import Login from './pages/auth/login'
import AdminDashboard from "./pages/dashboards/admin";
import Courses from "./pages/courses/index";

// css
import './assets/css/app.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/admin/dashboard",
        element: <AdminDashboard />
    },
    {
        path: "/courses",
        element: <Courses />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
)
