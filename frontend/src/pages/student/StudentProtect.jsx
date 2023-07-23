// The routes in this directory are protected by this component
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StudentProtect = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated || auth.userType !== "student") {
      navigate("/auth/login/student");
    }
  }, []);
  return <Outlet />;
};
export default StudentProtect;
