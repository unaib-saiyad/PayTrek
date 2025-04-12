import { useContext } from "react";
import { AlertContext } from "../../context/shared/AlertContext";

function Alert() {
  const { alert, setAlert } = useContext(AlertContext);
  const handleClose = ()=>{
    setAlert(null);
  }
  if (!alert) return null; // Don't render anything if no alert

  const alertStyles = {
    info: "bg-blue-400 border-blue-500 text-blue-50",
    success: "bg-green-400 border-green-500 text-green-50",
    error: "bg-red-400 border-red-500 text-red-50",
    warning: "bg-yellow-400 border-yellow-500 text-yellow-50",
  };

  return (
     <div role="alert" className={`mb-4 z-50 absolute font-mono flex w-full p-3 text-sm mt-2 rounded-md ${alertStyles[alert.type]}`}>
     {alert.message}
     <button onClick={handleClose} className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
     </button>
   </div>
  );
}

export default Alert;
