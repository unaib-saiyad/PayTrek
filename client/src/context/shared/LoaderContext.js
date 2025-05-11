import { createContext, useState } from "react";

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  // Show loader
  const toggleLoader = (value) => {
    setLoader(value);
  };

  return (
    <LoaderContext.Provider value={{ loader, toggleLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
