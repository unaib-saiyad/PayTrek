import React, { useEffect, useState, useContext } from 'react';
import Card from '../../Stats/Card'
import { SiCrowdsource } from "react-icons/si";
import { MdCalendarMonth } from "react-icons/md";
import { BsCalendarMonth } from "react-icons/bs";
import BarChart from '../../Stats/BarChart';
import LineChart from '../../ChartsAndGraphs/LineChart';
import { CiMenuKebab } from "react-icons/ci";
import { MdAdd } from "react-icons/md";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoaderContext } from '../../../context/shared/LoaderContext';

import { AlertContext } from '../../../context/shared/AlertContext';
import Grid from '../../Shared/Grid';
import ModalForms from '../../Shared/ModalForms';
import AlertModal from '../../Shared/AlertModal';
import { convertCurrency } from '../../../utils/convertCurrency';
import { useCurrency } from '../../../context/shared/CurrencyContext';

function Expense() {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
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
      "startDate": new Date(),
      "endDate": null,
      "isRecurring": true,
      "isActive": true,
      "notes": "",
    });
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState(false);
    const [currId, setCurrId] = useState(null);
    const { currency, currTitle } = useCurrency();

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
    const expenseLen = expenseList.length;
    const totalExpense = expenseList.reduce((x, y)=>x+= convertCurrency(y.amount, y.currency, currTitle),0);
    const cardsData = [ 
          {
            title: "Total",
            icon: SiCrowdsource,
            count: expenseLen,
            bgColor: "bg-gray-100",
          },
          {
            title: "Average Monthly Expense",
            icon: BsCalendarMonth,
            count:  <span className='flex'>{parseFloat(totalExpense/expenseLen).toFixed(4) || 0} {currency}</span>,
            bgColor: "bg-blue-100",
          },
          {
            title: "Total Yearly Expense",
            icon: MdCalendarMonth,
            count: <span className='flex'>{parseFloat(totalExpense).toFixed(4) || 0} {currency}</span>,
            bgColor: "bg-yellow-100",
          },
    ];

    const gridColumns = [
        {field:'name', type:"text"},
         {field:'amount', type:"number" }, 
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
          { label: 'once', value: 'once' },
          { label: 'rarely', value: 'rarely' },
          { label: 'monthly', value: 'monthly' },
          { label: 'weekly', value: 'weekly' },
          { label: 'bi-weekly', value: 'bi-weekly' },
          { label: 'quarterly', value: 'quarterly' },
        ],
      },      
      { name: 'currency', label: 'Currency', type: 'select', required: true,  placeHolder: "Currency of Expense",
        options: [
          { label: 'INR', value: 'INR' },
          { label: 'USD', value: 'USD' },
          { label: 'EUR', value: 'EUR' },
          { label: 'AED', value: 'AED' },
        ],
      },      

      { name: 'startDate', label: 'Start Date', type: 'date', required: true,  placeHolder: "Start Date", },
      { name: 'isRecurring', label: 'Is Recurring', type: 'checkbox', required: true,  placeHolder: "Is Recurring", },
      { name: 'notes', label: 'Notes', type: 'textarea', required: false,  placeHolder: "Notes", }
    ];

    const editFields = [
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
          { label: 'once', value: 'once' },
          { label: 'rarely', value: 'rarely' },
          { label: 'monthly', value: 'monthly' },
          { label: 'weekly', value: 'weekly' },
          { label: 'bi-weekly', value: 'bi-weekly' },
          { label: 'quarterly', value: 'quarterly' },
        ],
      },      
      { name: 'currency', label: 'Currency', type: 'select', required: true,  placeHolder: "Currency of Expense",
        options: [
          { label: 'INR', value: 'INR' },
          { label: 'USD', value: 'USD' },
          { label: 'EUR', value: 'EUR' },
          { label: 'AED', value: 'AED' },
        ],
      },      

      { name: 'startDate', label: 'Start Date', type: 'date', required: true,  placeHolder: "Start Date", },
      { name: 'isRecurring', label: 'Is Recurring', type: 'checkbox', required: true,  placeHolder: "Is Recurring", },
      { name: 'isActive', label: 'Is Active', type: 'checkbox', required: true,  placeHolder: "Is Active", },
      { name: 'notes', label: 'Notes', type: 'textarea', required: false,  placeHolder: "Notes", }
    ];

    const handleAdd = ()=>{
      setIsAddModalOpen(true);
    }

    const handleAddSubmit = async ()=>{
      toggleLoader(true);
  
      try {
        const res = await axios.post(`${backendURL}/expenseManagement/createExpenseSource`, addFormData, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        if(res.data.status){
          showAlert("Income source added successfully!", "success");
          await fetchExpenses();    
          setAddFormData({
            "name": "",
            "amount": 0,
            "category": "",
            "type": "",
            "frequency": "",
            "currency": "",
            "startDate": new Date(),
            "endDate": null,
            "isRecurring": true,
            "isActive": true,
            "notes": "",
          });
          setIsAddModalOpen(false);
        }
        else{
          showAlert("Something went wrong!...", "error");
        }
    
      } catch (e) {
        console.log(e);
        showAlert("Something went wrong while adding expense!", "error");
      }
    setTimeout(()=>toggleLoader(false), 500);
    }

    
    const handleEdit = (data)=>{
      setCurrId(data._id);
      setEditModalData(data);
      setEditModal(true);
  }

  const handleEditSubmit = async () => {
      toggleLoader(true);
    
      try {
        const res = await axios.put(`${backendURL}/expenseManagement/updateExpenseSource/${currId}`, editModalData, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        if(res.data.status){
          showAlert("Expense source updated successfully!", "success");
          fetchExpenses();
          setEditModal(false);
          setEditModalData(null);
        }
        else{
          showAlert("Something went wrong!", "error");
        }
    
      } catch (e) {
        console.log(e);
        showAlert("Something went wrong while updating income!", "error");
      }
      setTimeout(()=>toggleLoader(false), 500);
    };

    const handleDelete = (item)=>{
      setCurrId(item._id);
      setDeleteModal(true);
    }

    const handleDeleteOk = async ()=>{
      debugger;
      toggleLoader(true);
      try{
        const response = await axios.delete(`${backendURL}/expenseManagement/deleteExpenseSource/${currId}`,{
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        if(response.data.status){
          showAlert("History deleted successfully!...", 'success');
          fetchExpenses();
        }
        else{
          showAlert("Something went wrong!...", 'error');
        }
      }
      catch(err){
        console.log(err);
        showAlert("Server Error!...", 'error');
      }
      setCurrId(null);
      setDeleteModal(false);
      setTimeout(()=>toggleLoader(false), 500);
    }
      
    const handleView = async (data) =>{ navigate(`/Expense/${data._id}/history`, {state: {parentCurrency: data.currency}}); }

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
                <h1 className='dark:text-gray-100'>List of expense source</h1>
                <div className='flex dark:text-gray-100'>
                  <MdAdd className='cursor-pointer hover:text-gray-500 dark:hover:text-black' onClick={handleAdd} title='add' />
                  <CiMenuKebab className='cursor-pointer hover:text-gray-500 dark:hover:text-black' title='options' />
                </div>
              </div>
              <Grid columns={gridColumns} data={expenseList} onDelete={handleDelete} onEdit={handleEdit} onView={handleView} />
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

        <ModalForms
          title = "Edit Expense Source"
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          fields={editFields}
          onSubmit={handleEditSubmit}
          formData={editModalData}
          setFormData={setEditModalData}
        />
        <AlertModal 
          isOpen={deleteModal}
          onClose={()=>setDeleteModal(false)}
          message="Do you want to delete?..."
          handleOk={handleDeleteOk}
        /> 
      </>
    )
}

export default Expense;