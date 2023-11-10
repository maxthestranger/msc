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
import CreateCourse from "./pages/courses/create";
import CreateUser from "./pages/users/create";
import Users from "./pages/users/index.jsx";
import ResetPassword from "./pages/auth/resetPassword.jsx";
import InstructorDashboard from "./pages/dashboards/instructor.jsx";
import CoordinatorDashboard from "./pages/dashboards/coordinator.jsx";
import StudentDashboard from "./pages/dashboards/student.jsx";
import QaDashboard from "./pages/dashboards/qa.jsx";
import About from "./pages/about.jsx";
import Services from "./pages/services.jsx";
import Contact from "./pages/contact.jsx";
import Error from "./pages/error.jsx";
import EditUser from "./pages/users/edit.jsx";

// css
import './assets/css/app.css'
import Settings from "./pages/extras/settings.jsx";
import Reports from "./pages/extras/reports.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/services",
        element: <Services />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/reset-password",
        element: <ResetPassword />
    },
    {
        path: "/admin/dashboard",
        element: <AdminDashboard />
    },
    {
        path: "/admin/settings",
        element: <Settings />
    },
    {
        path: "/admin/reports",
        element: <Reports />
    },
    {
        path: "/instructor/dashboard",
        element: <InstructorDashboard />
    },
    {
        path: "/coordinator/dashboard",
        element: <CoordinatorDashboard />
    },
    {
        path: "/student/dashboard",
        element: <StudentDashboard />
    },
    {
        path: "/qa/dashboard",
        element: <QaDashboard />
    },
    {
        path: "/courses",
        element: <Courses />
    },
    {
        path: "/courses/create",
        element: <CreateCourse />
    },
    {
        path: "/courses/:id",
        element: <CreateCourse />
    },
    {
        path: "/courses/:id/edit",
        element: <CreateCourse />
    },
    {
        path: "/users",
        element: <Users />
    },
    {
        path: "/users/create",
        element: <CreateUser />
    },
    {
        path: "/users/:id",
        element: <Users />
    },
    {
        path: "/users/:id/edit",
        element: <EditUser />
    },
    {
        path: "*",
        element: <Error />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
)
