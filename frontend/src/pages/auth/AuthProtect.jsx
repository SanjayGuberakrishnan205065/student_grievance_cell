// The routes in this directory are protected by this component
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthProtect = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
};
export default AuthProtect;
