import React, { useEffect, useState, useContext } from 'react'
import Card from '../../Stats/Card'
import { SiCrowdsource } from "react-icons/si";
import { MdCalendarMonth } from "react-icons/md";
import { BsCalendarMonth } from "react-icons/bs";
import BarChart from '../../Stats/BarChart';
import LineChart from '../../ChartsAndGraphs/LineChart';
import { CiMenuKebab } from "react-icons/ci";
import { MdAdd } from "react-icons/md";

import IncomeList from './IncomeList';
import { AlertContext } from '../../../context/shared/AlertContext';
import axios from 'axios';
import { convertCurrency } from '../../../utils/convertCurrency';
import { LoaderContext } from '../../../context/shared/LoaderContext';
import ModalForms from '../../Shared/ModalForms';
import { useCurrency } from '../../../context/shared/CurrencyContext';
function IncomeLayout() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [incomeSource, setIncomeSource] = useState([]);
  const {showAlert} = useContext(AlertContext);
  const {toggleLoader} = useContext(LoaderContext);
  const { currency, currTitle } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
      "name": "",
      "amount": 0,
      "type": "",
      "category": "",
      "frequency": "",
      "currency": "",
      "taxable": false,
      "notes": "",
      "startDate": null,
      "isActive": true
    });
  const addFields = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeHolder: "Name (ex: Regular Job/ Freelancing)" },
    { name: 'amount', label: 'Amount', type: 'number', required: true, placeHolder: "Amount" },
    { name: 'type', label: 'Type', type: 'select', required: true, placeHolder: "Type",
      options: [
        { label: 'Fixed', value: 'fixed' },
        { label: 'Variable', value: 'variable' },
      ],
    },  
    { name: 'category', label: 'Category', type: 'text', required: false, placeHolder: "Category (ex: Side Hustle)" },
    { name: 'frequency', label: 'Frequency', type: 'select', required: true, placeHolder: "Frequency",
      options: [
        { label: 'monthly', value: 'monthly' },
        { label: 'weekly', value: 'weekly' },
        { label: 'bi-weekly', value: 'bi-weekly' },
        { label: 'quarterly', value: 'quarterly' },
      ],  
    },
    { name: 'currency', label: 'Currency', type: 'select', required: true, placeHolder: "Currency",
      options: [
        { label: 'INR', value: 'INR' },
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'AED', value: 'AED' },
      ], 
    },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true,  placeHolder: "Start Date", },
    { name: 'taxable', label: 'Taxable', type: 'checkbox', required: true,  placeHolder: "Taxable", },
    { name: 'notes', label: 'Notes', type: 'textarea', required: false,  placeHolder: "Notes", },
  ];

  const totalMonthlyIncome = incomeSource.reduce((acc, curr) => {
    return acc + convertCurrency(curr.amount, curr.currency, currTitle);
  }, 0);
  const totalYearlyIncome = totalMonthlyIncome * 12;

  const fetchIncomeSources = async ()=>{
    toggleLoader(true);
    try{
      const res = await axios.get(`${backendURL}/incomeManagement/getIncomeSources`, {
        headers: {
            "auth-token": localStorage.getItem("token"),
        },
        });
        setIncomeSource(res.data.data);
    }
    catch{
      showAlert('Something went wrong!...', 'error');
    }
    setTimeout(()=>{
      toggleLoader(false);
    }, 500);
  }

  useEffect(() => {
    fetchIncomeSources();
  }, []);

  const handleAdd = ()=>{
    setIsModalOpen(true);
  }

  const handleAddSubmit = async () => {
    toggleLoader(true);
  
    try {
      const res = await axios.post(`${backendURL}/incomeManagement/createIncomeSource`, addFormData, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      if(res.status){
        showAlert("Income source added successfully!", "success");
        await fetchIncomeSources();    
        setAddFormData({
          name: "",
          amount: 0,
          type: "",
          category: "",
          frequency: "",
          currency: "",
          taxable: false,
          notes: "",
          isActive: true,
          startDate: null,
        });
        setIsModalOpen(false);
      }
  
    } catch (e) {
      console.log(e);
      showAlert("Something went wrong while adding income!", "error");
    }
    setTimeout(()=>toggleLoader(false), 500);
  };
  
  const cardsData = [
    {
      title: "Total Income Sources",
      icon: SiCrowdsource,
      count: incomeSource.length,
      bgColor: "bg-gray-100",
    },
    {
      title: "Total Monthly Income",
      icon: BsCalendarMonth,
      count: <span className='flex'>{parseFloat(totalMonthlyIncome).toFixed(4)} {currency}</span>,
      bgColor: "bg-blue-100", 
    },
    {
      title: "Total Yearly Income",
      icon: MdCalendarMonth,
      count: <span className='flex'>{parseFloat(totalYearlyIncome).toFixed(4)} {currency}</span>,
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
          <div className='bg-white rounded-lg dark:bg-gray-700 border border-gray-300 col-span-3'>
            <div className='p-4 text-black font-bold text-lg flex justify-between'>
              <h1 className='dark:text-gray-100'>List of incomes</h1>
              <div className='flex dark:text-gray-100'>
                <MdAdd className='cursor-pointer hover:text-gray-500 dark:hover:text-black' onClick={handleAdd} title='add' />
                <CiMenuKebab className='cursor-pointer hover:text-gray-500 dark:hover:text-black' title='options' />
              </div>
            </div>
            <IncomeList data={incomeSource} fetchData={fetchIncomeSources} />
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
      <ModalForms
        title = "Add Income Source"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={addFields}
        onSubmit={handleAddSubmit}
        formData={addFormData}
        setFormData={setAddFormData}
      />
    </>
  )
}

export default IncomeLayout