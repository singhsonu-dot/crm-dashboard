import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Customers = lazy(() => import("./pages/Customers"))
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
const Analytics = lazy(() => import("./pages/Analytics"))
const Subscription = lazy(() => import("./pages/Subscription"))
const Settings = lazy(() => import("./pages/Settings"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))
const Signup = lazy(() => import( "./pages/Signup"))
const ResetPassword = lazy(() => import("./pages/ResetPassword"))
import useThemeStore from "./store/themeStore";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/ui/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>
  },
  {
    path: "/signup",
    element: <Signup/>
  }, 
  {
    path: "/reset-password", 
    element: <ResetPassword/>
  }, 
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/customers",
    element: (
      <ProtectedRoute>
        <Customers/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <Analytics/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/subscription",
    element: (
      <ProtectedRoute>
        <Subscription/>
      </ProtectedRoute>
    ),
  }, 
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings/>
      </ProtectedRoute>
    ),
  }, 
])

function App() {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    const root = window.document.documentElement; 
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark"); 
    }
  }, [isDark]); 

  return (
    <>
      <Toaster/>

      <Suspense fallback={<Loader/>}> 
        <RouterProvider router={router}/> 
      </Suspense>
    </>
  )
}

export default App 
