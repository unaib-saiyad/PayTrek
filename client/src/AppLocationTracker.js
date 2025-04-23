import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setLocation } from "./utils/locationHelper";

const AppLocationTracker = () => {
  const location = useLocation();

  useEffect(() => {
    setLocation(location);
  }, [location]);

  return null;
};

export default AppLocationTracker;
