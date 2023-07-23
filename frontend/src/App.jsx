import { Outlet } from "react-router-dom";
import { useAuthDispatch } from "./context/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

function App() {
  const authDispatch = useAuthDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        authDispatch({
          type: "LOGIN",
          userType: res.data.user.userType,
          user: res.data.user.userInfo,
        });
        setLoading(false);
      })
      .catch(() => {
        authDispatch({ type: "LOGOUT" });
        setLoading(false);
      });
  }, []);
  return loading ? (
    <div className="min-h-screen pt-40">
      <HashLoader color="#ff8f20" size={100} className="mx-auto" />
      <div className="mt-10 text-3xl text-center">
        Checking your credentials...
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
