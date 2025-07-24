import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import Card from '../../Stats/Card'
import { useNavigate } from 'react-router-dom';
import { SiCrowdsource } from "react-icons/si";
import { MdCalendarMonth } from "react-icons/md";
import { BsCalendarMonth } from "react-icons/bs";
import BarChart from '../../Stats/BarChart';
import LineChart from '../../ChartsAndGraphs/LineChart';
import { CiMenuKebab } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import { AlertContext } from '../../../context/shared/AlertContext';
import axios from 'axios';
import { LoaderContext } from '../../../context/shared/LoaderContext';
import ModalForms from '../../Shared/ModalForms';
import AlertModal from '../../Shared/AlertModal';

import Grid from '../../Shared/Grid';

function IncomeHisLayout() {
  const navigate = useNavigate();
  const { __id } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [incomeHistories, setIncomeHistories] = useState([]);
  const [isEditModal, setIsEditModal] = useState(false);
  const {showAlert} = useContext(AlertContext);
  const {toggleLoader} = useContext(LoaderContext);
  const [editFormData, setEditFormData] = useState(null);
  const [isAlertModal, setIsAlertModal] = useState(false);
  const [delteId, setDeleteId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    incomeSource: __id,
    month: "",
    adjustment: 0,
    inHandAmount: 0,
    reason: ""
  });
  
  const fields = [
    { name: 'month', label: 'Month', type: 'date', required: true,  placeHolder: "Month", },
    { name: 'adjustment', label: 'Adjustment', type: 'number', required: true,  placeHolder: "Adjustment", },
    { name: 'inHandAmount', label: 'In Hand Amount', type: 'number', required: true,  placeHolder: "In Hand Amount", },
    { name: 'reason', label: 'Reason', type: 'text', required: false,  placeHolder: "Reason for adjustment", },
  ];

  const fetchHistory = async () => {
      debugger;
      toggleLoader(true);
      try{
      const res = await axios.get(`${backendURL}/incomeManagement/getIncomeHistory/${__id}`, {
          headers: {
              "auth-token": localStorage.getItem("token"),
          },
          });
          setIncomeHistories(res.data.data);
      }
      catch(e){
          console.log(e)
          showAlert('Something went wrong!...', 'error');
      }
      setTimeout(()=>{toggleLoader(false);}, 500);
  };

  useEffect(() => {
      fetchHistory();
    }, [__id]);
    
  const totalMonthlyIncome = incomeHistories.reduce((acc, curr) => {
    return acc + curr.inHandAmount;
  }, 0);
  const newestHistories = incomeHistories.sort((a, b) => new Date(b.month) - new Date(a.month));
  let totalYearlyIncome = 0;
  let newestHistoryLen = incomeHistories.length>12?12:incomeHistories.length;
  for(let i=0;i<newestHistoryLen;i++){
    totalYearlyIncome+=newestHistories[i].inHandAmount;
  }
  const cardsData = [
        {
          title: "Total",
          icon: SiCrowdsource,
          count: incomeHistories.length,
          bgColor: "bg-gray-100",
        },
        {
          title: "Average Monthly Income",
          icon: BsCalendarMonth,
          count:  (totalMonthlyIncome/incomeHistories.length) || 0,
          bgColor: "bg-blue-100",
        },
        {
          title: "Total Yearly Income(last 12 months)",
          icon: MdCalendarMonth,
          count: totalYearlyIncome,
          bgColor: "bg-yellow-100",
        },
    ];
    
  const handleDelete = async (incomeHis)=>{
    setDeleteId(incomeHis._id);
    setIsAlertModal(true);
  }

  const handleEdit = (data)=>{
    setEditFormData(data);
    setIsEditModal(true);
  }

  const handleEditSubmit = async ()=>{
    toggleLoader(true);
    try{
      const res = await axios.put(`${backendURL}/incomeManagement/updateIncomeHistory/${editFormData._id}`, editFormData, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      if(res.status){
        fetchHistory();
        setIsEditModal(false);
        setEditFormData(null);
      }
      else{
        showAlert(res.message, 'error');
      }
    }
    catch{
      showAlert("Something went wrong!...", 'error');
    }
    setTimeout(()=>toggleLoader(false), 500);
  }

  const handleOk = async ()=>{
    toggleLoader(true);
    try{
      let res = await axios.delete(`${backendURL}/incomeManagement/deleteIncomeHistory/${delteId}`,{
        headers: {
          "auth-token": localStorage.getItem("token"),
          },
      });
      if(res.data.status){
        showAlert("Income source deleted successfully!", "success");
        fetchHistory();
      }
      else{
        showAlert(res.data.message, "error");
      }
    }
    catch(err){
      showAlert("Something went wrong!...", "error");
    }
    setDeleteId(null);
    setIsAlertModal(false);
    setTimeout(()=>toggleLoader(false), 500);
  }

  const handleAdd = async ()=>{
    setIsAddModalOpen(true);
  }
  
  const handleAddSubmit = async () => {
    toggleLoader(true);
  
    try {
      const res = await axios.post(`${backendURL}/incomeManagement/createIncomeHistory`, addFormData, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      if(res.data.status){
        showAlert("Income source added successfully!", "success");
        await fetchHistory();    
        setAddFormData({
          incomeSource: __id,
          month: "",
          adjustment: 0,
          inHandAmount: 0,
          reason: ""
        });
        setIsAddModalOpen(false);
      }
      else{
        showAlert(res.data.message, "error");
      }
  
    } catch (e) {
      showAlert("Something went wrong while adding income!", "error");
    }
    setTimeout(()=>toggleLoader(false), 500);
  };

  const backButtonHandler = ()=>{
    navigate(-1);
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
                <IoIosArrowBack onClick={backButtonHandler} className='hover:bg-gray-200 rounded' />
              </span>
              <h1 className='dark:text-gray-100'>List of incomes histories</h1>
              <div className='flex dark:text-gray-100'>
                <MdAdd className='cursor-pointer hover:text-gray-500 dark:hover:text-black' onClick={handleAdd} title='add' />
                <CiMenuKebab className='cursor-pointer hover:text-gray-500 dark:hover:text-black' title='options' />
              </div>
            </div>
            {/* <IncomeList data={incomeHistories} fetchData={[]} /> */}
            <Grid columns={[{field:'month', type:"time"}, {field:'adjustment', type:"number"}, {field:'inHandAmount', type:"number"}, {field: 'updatedAt', type:"time"}]} data={incomeHistories} onDelete={handleDelete} onEdit={handleEdit} />
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
                title = "Edit Income History"
                isOpen={isEditModal}
                onClose={() => setIsEditModal(false)}
                fields={fields}
                onSubmit={handleEditSubmit}
                formData={editFormData}
                setFormData={setEditFormData}
            />

      <ModalForms
        title = "Add Income History"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        fields={fields}
        onSubmit={handleAddSubmit}
        formData={addFormData}
        setFormData={setAddFormData}
      />

      <AlertModal 
                isOpen={isAlertModal}
                onClose={()=>setIsAlertModal(false)}
                message="Do you want to delete?..."
                handleOk={handleOk}
            />
    </>
  )
}

export default IncomeHisLayout