import React, {useState, useContext} from 'react'
import axios from 'axios';
import AlertModal from './AlertModal';
import ModalForms from './ModalForms';

import { AlertContext } from '../../context/shared/AlertContext';
import { LoaderContext } from '../../context/shared/LoaderContext';

function IncomeList({data, fetchData}) {
    const [isAlertModal, setIsAlertModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);

    const [currId, setCurrId] = useState(null);
    const [editFormData, setEditFormData] = useState(null);

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
                            <td className="py-2">{item.amount}</td>
                            <td className="py-2">{item.frequency}</td>
                            <td className="py-2">{new Date(item.startDate).toLocaleDateString()}</td>
                            <td className="py-2">{item.endDate?new Date(item.endDate).toLocaleDateString(): "-"}</td>
                            <td className="py-2">
                                <button onClick={()=>{handleView(item._id)}} title="view" className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
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