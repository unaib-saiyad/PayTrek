import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { navigateTo } from "../../utils/navigateHelper";
import { AlertContext } from "./AlertContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useContext(AlertContext);
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const publicRoutes = ["/", "/signup"];

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${backendURL}/fetchUser`, {
        headers: {
          "auth-token": token,
        },
      });
      setUser(res.data.user);
      console.log(res);
    } catch (err) {
      console.error("User fetch error:", err);
      showAlert("Please login to continue", "warning");
      navigateTo("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    if (!publicRoutes.includes(currentPath)) {
      fetchUser();
    } else {
      setUser(null);
      localStorage.setItem("token", '');
      setLoading(false);

    }
  }, [location.pathname]);

  const triggerAuthUpdate = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, triggerAuthUpdate }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
