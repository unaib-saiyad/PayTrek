import React, { useEffect, useState, useContext } from 'react';
import Card from '../../Stats/Card'
import { SiCrowdsource } from "react-icons/si";
import { MdCalendarMonth } from "react-icons/md";
import { BsCalendarMonth } from "react-icons/bs";
import BarChart from '../../Stats/BarChart';
import LineChart from '../../ChartsAndGraphs/LineChart';
import { CiMenuKebab } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LoaderContext } from '../../../context/shared/LoaderContext';

import { AlertContext } from '../../../context/shared/AlertContext';
import Grid from '../../Shared/Grid';
import ModalForms from '../../Shared/ModalForms';
import AlertModal from '../../Shared/AlertModal';

function Expense() {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const { __id } = useParams();
    const {toggleLoader} = useContext(LoaderContext);
    const [expenseList, setExpenseList] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const {showAlert} = useContext(AlertContext);
    const [addFormData, setAddFormData] = useState({
      "expenseSource": __id,
      "month": new Date(),
      "actualAmount": 0,
      "adjustment": 0,
      "reason": "",
      "notes": "",
    });
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState(false);
    const [currId, setCurrId] = useState(null);

    const fetchExpensesHist = async () => {
        toggleLoader(true);
        try{
        const res = await axios.get(`${backendURL}/expenseManagement/getExpenseHistory/${__id}`, {
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
        fetchExpensesHist();
    }, []);
     
    const expenseLen = expenseList.length;
    const totalExpense = expenseList.reduce((x, y)=>x+=(y.actualAmount+y.adjustment),0); 
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
            count:  (totalExpense/expenseLen) || 0,
            bgColor: "bg-blue-100",
          },
          {
            title: "Total Yearly Expense",
            icon: MdCalendarMonth,
            count: totalExpense || 0,
            bgColor: "bg-yellow-100",
          },
    ];

    const gridColumns = [
        {field:'month', type:"text"},
         {field:'actualAmount', type:"number"}, 
         {field:'adjustment', type:"number"}, 
         {field:'reason', type:"text"}, 
    ];

    const fields = [
      { name: 'month', label: 'Month', type: 'date', required: true,  placeHolder: "Month", },
      { name: 'actualAmount', label: 'Actual Amount', type: 'number', required: true,  placeHolder: "Actual Amount", },
      { name: 'adjustment', label: 'Adjustment', type: 'number', required: true,  placeHolder: "Adjustment", },
      { name: 'reason', label: 'reason', type: 'text', required: true,  placeHolder: "Reason of Expense", },
      { name: 'notes', label: 'notes', type: 'textarea', required: true,  placeHolder: "notes", },

    ];


    const handleAdd = ()=>{
      setIsAddModalOpen(true);
    }

    const handleAddSubmit = async ()=>{
      toggleLoader(true);
  
      try {
        const res = await axios.post(`${backendURL}/expenseManagement/createExpenseHistory`, addFormData, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        if(res.data.status){
          showAlert("Expense History added successfully!", "success");
          await fetchExpensesHist();    
          setAddFormData({
            "expenseSource": __id,
            "month": new Date(),
            "actualAmount": 0,
            "adjustment": 0,
            "reason": "",
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
        const res = await axios.put(`${backendURL}/expenseManagement/updateExpenseHistory/${currId}`, editModalData, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        if(res.data.status){
          showAlert("Expense History updated successfully!", "success");
          fetchExpensesHist();
          setEditModal(false);
          setEditModalData(null);
        }
        else{
          showAlert("Something went wrong!", "error");
        }
    
      } catch (e) {
        console.log(e);
        showAlert("Something went wrong while updating expense!", "error");
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
        const response = await axios.delete(`${backendURL}/expenseManagement/deleteExpenseHistory/${currId}`,{
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        if(response.data.status){
          showAlert("History deleted successfully!...", 'success');
          fetchExpensesHist();
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
              <span className='cursor-pointer' title='Back'>
                <IoIosArrowBack onClick={()=>navigate(-1)} className='hover:bg-gray-200 rounded' />
              </span>
                <h1 className='dark:text-gray-100'>List of expense histories</h1>
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

        <ModalForms
          title = "Edit Expense Source"
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          fields={fields}
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