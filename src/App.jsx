import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Analytics from "./pages/Analytics";
import Subscription from "./pages/Subscription";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import useThemeStore from "./store/themeStore";
import { useEffect } from "react";

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
    path: "/Signup",
    element: <Signup/>
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

      <RouterProvider router={router}/>
    </>
  )
}

export default App 
