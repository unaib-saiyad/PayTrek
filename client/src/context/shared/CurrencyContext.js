import { createContext, useContext, useState } from "react";

import { FaRupeeSign, FaEuroSign } from 'react-icons/fa';
import { IoLogoUsd } from "react-icons/io5";
import { TbCurrencyDirham } from "react-icons/tb";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({children})=>{
    const [currency, setCurrency] = useState(<FaRupeeSign />);
    const [currIndex, setIndex] = useState(0);
    const [currTitle, setCurrTitle] = useState('Rupees');
    const currencyList = [<FaRupeeSign />, <IoLogoUsd />, <FaEuroSign />,<TbCurrencyDirham /> ];
    const titleList = ['Rupees', 'USD', 'Euro', 'Dirham' ];
    const changeCurrency = ()=>{
        let newIndex = (currIndex+1)%4;
        setCurrency(currencyList[newIndex]);
        setIndex(newIndex);
        setCurrTitle(titleList[newIndex]);
    }
    return (
    <CurrencyContext.Provider value={{currency, changeCurrency, currTitle}}>
        { children }
    </CurrencyContext.Provider>
    )
}

export const useCurrency = ()=>useContext(CurrencyContext);