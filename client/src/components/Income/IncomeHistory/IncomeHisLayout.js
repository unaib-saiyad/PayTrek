import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import Card from '../../Stats/Card'

import { SiCrowdsource } from "react-icons/si";
import { MdCalendarMonth } from "react-icons/md";
import { BsCalendarMonth } from "react-icons/bs";
import BarChart from '../../Stats/BarChart';
import LineChart from '../../ChartsAndGraphs/LineChart';
import { CiMenuKebab } from "react-icons/ci";
import { MdAdd } from "react-icons/md";

import { AlertContext } from '../../../context/shared/AlertContext';
import axios from 'axios';
import { convertCurrency } from '../../../utils/convertCurrency';
import { LoaderContext } from '../../../context/shared/LoaderContext';
import ModalForms from '../../Shared/ModalForms';

import Grid from '../../Shared/Grid';

function IncomeHisLayout() {
  const { __id } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [incomeHistories, setIncomeHistories] = useState([]);
  const [isEditModal, setIsEditModal] = useState(false);
  const {showAlert} = useContext(AlertContext);
  const {toggleLoader} = useContext(LoaderContext);
  const [editFormData, setEditFormData] = useState(null);

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
  const cardsData = [
        {
          title: "Total",
          icon: SiCrowdsource,
          count: incomeHistories.length,
          bgColor: "bg-gray-100",
        },
        {
          title: "Total Monthly Income",
          icon: BsCalendarMonth,
          count:  ' $',
          bgColor: "bg-blue-100",
        },
        {
          title: "Total Yearly Income",
          icon: MdCalendarMonth,
          count: ' ₹',
          bgColor: "bg-yellow-100",
        },
    ];
    
  const handleDelete = async (id)=>{
      alert('Delete')
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
                <MdAdd className='cursor-pointer hover:text-gray-500 dark:hover:text-black' onClick={()=>{debugger}} title='add' />
                <CiMenuKebab className='cursor-pointer hover:text-gray-500 dark:hover:text-black' title='options' />
              </div>
            </div>
            {/* <IncomeList data={incomeHistories} fetchData={[]} /> */}
            <Grid columns={[{field:'month', type:"text"}, {field:'adjustment', type:"number"}, {field:'inHandAmount', type:"number"}, {field: 'updatedAt', type:"time"}]} data={incomeHistories} onDelete={handleDelete} onEdit={handleEdit} />
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
    </>
  )
}

export default IncomeHisLayout