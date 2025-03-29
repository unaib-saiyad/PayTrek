import React from 'react'
import {FiSend} from "react-icons/fi";
import Title from '../../ui/Title'
import BarChart from './BarChart';
function Balance({darkMode}) {
  return (
    <div className='bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1'>
        <div className='flex justify-between items-center'>
            <Title>Balance</Title>
            <FiSend className='bg-gray-500 p-2 rounded-full text-gray-300 w-8 h-8'/>
        </div>
        <div className='font-bold text-2xl'>
            <h1 className='font-bold text-2xl'>$6000,000 <span className='font-medium text-xl'>(USD)</span></h1>
            <span >on July 2024</span>
        </div>
        <BarChart darkMode={darkMode}/>
    </div>
  )
}

export default Balance