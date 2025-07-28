import React, { useEffect, useState, useContext } from 'react';
import Card from '../../Stats/Card'
import { SiCrowdsource } from "react-icons/si";
import { MdCalendarMonth } from "react-icons/md";
import { BsCalendarMonth } from "react-icons/bs";
import BarChart from '../../Stats/BarChart';
import LineChart from '../../ChartsAndGraphs/LineChart';
import { CiMenuKebab } from "react-icons/ci";
import { MdAdd } from "react-icons/md";

import axios from 'axios';
import { LoaderContext } from '../../../context/shared/LoaderContext';

import { AlertContext } from '../../../context/shared/AlertContext';
import Grid from '../../Shared/Grid';
import ModalForms from '../../Shared/ModalForms';

function Expense() {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const {toggleLoader} = useContext(LoaderContext);
    const [expenseList, setExpenseList] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const {showAlert} = useContext(AlertContext);
    const [addFormData, setAddFormData] = useState({
      "name": "",
      "amount": 0,
      "category": "",
      "type": "",
      "frequency": "",
      "currency": "",
      "startDate": "",
      "endDate": "",
      "isRecurring": true,
      "isActive": true,
      "notes": "",
    });

    const fetchExpenses = async () => {
        toggleLoader(true);
        try{
        const res = await axios.get(`${backendURL}/expenseManagement/getExpenseSources`, {
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
            });
            setExpenseList(res.data.data);
        }
        catch(e){
            console.log(e)
            showAlert('Something went wrong!...', 'error');
        }
        setTimeout(()=>{toggleLoader(false);}, 500);
    };
  
    useEffect(() => {
        fetchExpenses();
    }, []);
      
    const cardsData = [
          {
            title: "Total",
            icon: SiCrowdsource,
            count: expenseList.length,
            bgColor: "bg-gray-100",
          },
          {
            title: "Average Monthly Expense",
            icon: BsCalendarMonth,
            count:  0,
            bgColor: "bg-blue-100",
          },
          {
            title: "Total Yearly Expense",
            icon: MdCalendarMonth,
            count: 0,
            bgColor: "bg-yellow-100",
          },
    ];

    const gridColumns = [
        {field:'name', type:"text"},
         {field:'amount', type:"number"}, 
         {field:'category', type:"text"}, 
         {field: 'frequency', type:"text"},
         {field: 'currency', type:"text"},
    ];

    const fields = [
      { name: 'name', label: 'Name', type: 'text', required: true,  placeHolder: "Name of Expense", },
      { name: 'amount', label: 'Amount', type: 'number', required: true,  placeHolder: "Amount of Expense", },
      { name: 'category', label: 'Category', type: 'text', required: true,  placeHolder: "Category of Expense", },
      { name: 'type', label: 'Type', type: 'select', required: true,  placeHolder: "Type of Expense",
        options: [
          { label: 'Fixed (Repeat)', value: 'fixed' },
          { label: 'Variable (Rarely/Onetime)', value: 'variable' },
        ],
      },  
      { name: 'frequency', label: 'Frequency', type: 'select', required: true,  placeHolder: "Frequency of Expense",
        options: [
          { label: 'monthly', value: 'monthly' },
          { label: 'weekly', value: 'weekly' },
          { label: 'bi-weekly', value: 'bi-weekly' },
          { label: 'quarterly', value: 'quarterly' },
        ],
      },      

      { name: 'startDate', label: 'Start Date', type: 'date', required: true,  placeHolder: "Start Date", },
      { name: 'isRecurring', label: 'Is Recurring', type: 'checkbox', required: true,  placeHolder: "Is Recurring", },
      { name: 'notes', label: 'Notes', type: 'textarea', required: false,  placeHolder: "Notes", }
    ]

    const handleAdd = ()=>{
      setIsAddModalOpen(true);
    }

    const handleAddSubmit = ()=>{

    }

    const handleEdit = ()=>{
        debugger;
    }

    const handleDelete = ()=>{
        debugger;
    }
      
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
                <h1 className='dark:text-gray-100'>List of incomes histories</h1>
                <div className='flex dark:text-gray-100'>
                  <MdAdd className='cursor-pointer hover:text-gray-500 dark:hover:text-black' onClick={handleAdd} title='add' />
                  <CiMenuKebab className='cursor-pointer hover:text-gray-500 dark:hover:text-black' title='options' />
                </div>
              </div>
              <Grid columns={gridColumns} data={expenseList} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
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
          title = "Add Expense Source"
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          fields={fields}
          onSubmit={handleAddSubmit}
          formData={addFormData}
          setFormData={setAddFormData}
        />    
      </>
    )
}

export default Expense;