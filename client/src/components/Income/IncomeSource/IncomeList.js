import React, {useState, useContext} from 'react'
import AlertModal from '../../Shared/AlertModal';
import ModalForms from '../../Shared/ModalForms';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../context/shared/AlertContext';
import { LoaderContext } from '../../../context/shared/LoaderContext';
import { FaTrash, FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

function IncomeList({data, fetchData}) {
    const navigate = useNavigate();
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const {showAlert} = useContext(AlertContext);
    const {toggleLoader} = useContext(LoaderContext);

    const [isAlertModal, setIsAlertModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);

    const [currId, setCurrId] = useState(null);
    const [editFormData, setEditFormData] = useState(null);

    const fields = [
        { name: 'name', label: 'Name', type: 'text', required: true, placeHolder: "Name (ex: Regular Job/ Freelancing)" },
        { name: 'amount', label: 'Amount', type: 'number', required: true, placeHolder: "Amout" },
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
        { name: 'endDate', label: 'End Date', type: 'date', required: false,  placeHolder: "End Date", },
        { name: 'taxable', label: 'Taxable', type: 'checkbox', required: true,  placeHolder: "Taxable", },
        { name: 'isActive', label: 'Is Active', type: 'checkbox', required: true,  placeHolder: "If It Is Active", },
        { name: 'notes', label: 'Notes', type: 'textarea', required: false,  placeHolder: "Notes", },
      ];

    const handleDelete = async (id)=>{
        setCurrId(id);
        setIsAlertModal(true);
    }

    const handleOk = async ()=>{
        toggleLoader(true);
  
        try {
        const res = await axios.delete(`${backendURL}/incomeManagement/deleteIncomeSource/${currId}`, {
            headers: {
            "auth-token": localStorage.getItem("token"),
            },
        });
        if(res.status){
            showAlert("Income source deleted successfully!", "success");
            fetchData();
        }
    
        } 
        catch (e) {
        console.log(e);
        showAlert("Something went wrong while deleting income!", "error");
        }
        setTimeout(()=>toggleLoader(false), 500);
        setIsAlertModal(false);
    }

    const handleEdit = (data)=>{
        setCurrId(data._id);
        setEditFormData(data);
        setIsEditModal(true);
    }

    const handleEditSubmit = async () => {
        toggleLoader(true);
      
        try {
          const res = await axios.put(`${backendURL}/incomeManagement/updateIncomeSource/${currId}`, editFormData, {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          });
          if(res.status){
            showAlert("Income source updated successfully!", "success");
            fetchData();
            setIsEditModal(false);
            setEditFormData(null);
          }
      
        } catch (e) {
          console.log(e);
          showAlert("Something went wrong while updating income!", "error");
        }
        setTimeout(()=>toggleLoader(false), 500);
      };
    
    const handleView = async (item) =>{
      navigate(`/income/${item._id}/history`, {state: {parentCurrency:item.currency}});
    }

    return (
        <>
            <div className='px-2 h-[50vh] overflow-auto'>
                <table className="w-full border-collapse">
                    <thead className='sticky top-0 bg-white dark:bg-gray-900 dark:text-gray-300'>
                        <tr className="border-b">
                            <th className="text-left py-2">Name</th>
                            <th className="text-left py-2">Amount</th>
                            <th className="text-left py-2">Frequency</th>
                            <th className="text-left py-2">Start Date</th>
                            <th className="text-left py-2">End Date</th>
                            <th className="text-left py-2 w-40">Actions</th>
                        </tr>
                    </thead>
                    <tbody className=' dark:bg-gray-800 dark:text-gray-300'>
                        {data.map(item=>{
                            return <tr className={`border-b ${!item.isActive && "bg-red-300 dark:bg-red-700"}`} key={item._id}>
                            <td className="py-2">{item.name}</td>
                            <td className="py-2">{item.amount} {item.currency}</td>
                            <td className="py-2">{item.frequency}</td>
                            <td className="py-2">{new Date(item.startDate).toLocaleDateString()}</td>
                            <td className="py-2">{item.endDate?new Date(item.endDate).toLocaleDateString(): "-"}</td>
                            <td className="py-2">
                                <button onClick={()=>{handleView(item)}} title="view" className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                                    <FaEye/>
                                </button>
                                <button onClick={()=>{handleEdit(item)}} title="edit" className="ml-1 px-3 py-1 text-sm bg-orange-400 text-white rounded hover:bg-orange-500">
                                    <MdModeEdit/>
                                </button>
                                <button onClick={() => handleDelete(item._id)} title="delete" className="ml-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                        })}
                    </tbody>
                </table>

            </div>
            <AlertModal 
                isOpen={isAlertModal}
                onClose={()=>setIsAlertModal(false)}
                message="Do you want to delete?..."
                handleOk={handleOk}
            />
            <ModalForms
                title = "Edit Income Source"
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

export default IncomeList