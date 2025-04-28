import React from 'react'
import Card from '../../Stats/Card'
import { SiCrowdsource } from "react-icons/si";
import { MdCalendarMonth } from "react-icons/md";
import { BsCalendarMonth } from "react-icons/bs";
import BarChart from '../../Stats/BarChart';
import LineChart from '../../ChartsAndGraphs/LineChart';
import { CiMenuKebab } from "react-icons/ci";
import IncomeList from './IncomeList';

function IncomeLayout() {
  const cardsData = [
    {
      title: "Total Income Sources",
      icon: SiCrowdsource,
      count: 2,
      bgColor: "bg-gray-100",
    },
    {
      title: "Total Monthly Income",
      icon: BsCalendarMonth,
      count: 50000,
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Yearly Income(April 2025)",
      icon: MdCalendarMonth,
      count: 125000,
      bgColor: "bg-yellow-100",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-5" style={{ width: "100%" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cardsData.map((data, index) => {
            return <Card key={index} data={data} />
          })}
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 h-[70vh]'>
          <div className='bg-white rounded-lg dark:bg-gray-500 border border-gray-300 col-span-3'>
            <div className='p-4 text-black font-bold text-lg flex justify-between'>
              <h1 className=''>List of incomes</h1>
              <CiMenuKebab className='cursor-pointer hover:text-gray-500' />
            </div>
            <IncomeList />
          </div>
          {/* <div className='bg-white rounded-lg dark:bg-gray-500 border border-gray-300 lg:col-span-1 md:col-span-1 col-span-2'>
            <div className='p-4 text-black font-bold text-lg'>
              <h1 className=''>Highlights</h1>
              <div className='flex items-center text-sm font-normal mt-1'>
                <FaArrowUp className='text-green-500 mr-2' /><span>20% this Month</span>
                <FaArrowDown className='text-green-500 mr-2' /><span>20% this Month</span>
              </div>
            </div>
            <div>
              To be mentioned
            </div>
          </div> */}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
          <div className='bg-white rounded-lg dark:bg-gray-500 pt-[110px] border border-gray-300'>
            <BarChart />
          </div>
          <div className='bg-white rounded-lg dark:bg-gray-500 border border-gray-300'>
            <LineChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default IncomeLayout