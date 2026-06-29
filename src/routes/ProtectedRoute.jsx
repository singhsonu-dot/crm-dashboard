import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../services/authService"
import { useEffect, useState } from "react"

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await 
      isAuthenticated();
      setIsAuth(auth);
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div className="text-white">Loading...</div>; 
  }
    return isAuth ? children : <Navigate to="/" /> 
}

export default ProtectedRoute 