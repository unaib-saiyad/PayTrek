import { createContext, useContext, useState } from "react";

import { FaRupeeSign, FaEuroSign } from 'react-icons/fa';
import { IoLogoUsd } from "react-icons/io5";
import { TbCurrencyDirham } from "react-icons/tb";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({children})=>{
    const currencyList = [<FaRupeeSign />, <IoLogoUsd />, <FaEuroSign />,<TbCurrencyDirham /> ];
    const titleList = ['INR', 'USD', 'EUR', 'AED'];
    const getSavedCurrency = ()=>{
        let saved = localStorage.getItem('currency');
        return saved ? parseInt(saved, 10) : 0;
    }
    const [currIndex, setIndex] = useState(getSavedCurrency);
    const [currency, setCurrency] = useState(currencyList[currIndex]);
    const [currTitle, setCurrTitle] = useState(titleList[currIndex]);
    const changeCurrency = ()=>{
        let newIndex = (currIndex+1)%4;
        setCurrency(currencyList[newIndex]);
        setIndex(newIndex);
        setCurrTitle(titleList[newIndex]);
        localStorage.setItem('currency', newIndex);
    }
    return (
    <CurrencyContext.Provider value={{currency, changeCurrency, currTitle}}>
        { children }
    </CurrencyContext.Provider>
    )
}

export const useCurrency = ()=>useContext(CurrencyContext);