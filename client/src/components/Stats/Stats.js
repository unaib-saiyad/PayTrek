import React from 'react'
import {empolyeesData} from "../../constants";
import Balance from './Balance';
import Card from './Card';

function Stats({darkMode}) {
  return (
    <div className='flex flex-col md:flex-row gap-5'>
        <div className='flex flex-col gap-4 h-full'>
            {empolyeesData.map((data, index)=>{
                return <Card key={index} data={data} />
            })}
        </div>
        <Balance darkMode={darkMode}/>
    </div>
  )
}

export default Stats