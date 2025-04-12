import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  // Show alert
  const showAlert = (message, type = "info") => {
    setAlert({ message, type });

    // Auto-hide alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alert, setAlert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
