import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }else{
            navigate("/login")
        }
      }, [navigate]);

  
  // Return null while navigating to avoid rendering the children prematurely
  if (!user) return null;

  return children;
};

export default ProtectedRoute;
