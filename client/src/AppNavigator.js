import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "./utils/navigateHelper";

const AppNavigator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return null;
};

export default AppNavigator;