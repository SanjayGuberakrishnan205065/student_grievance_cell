import axios from "axios";
import { useEffect } from "react";
import { useAuthDispatch } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/api/auth/logout")
      .then(() => {
        authDispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  });
  return <div>Logging you out...</div>;
};
export default Logout;
