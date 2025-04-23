import React from 'react'

import { MdFileUpload } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";


import UserLogo from '../../assets/user01.png';
import bg from '../../assets/bg01.jpg';
function UserData({ isOpen, toggleUserModal }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg w-full md:w-3/6 sm:w-full h-5/6 flex flex-col">
                <div className="flex flex-col h-full rounded-2xl">

                    <div className='absolute h-1/6'>
                        <img src={UserLogo} alt="user" className='rounded-full relative top-1/2 left-1.5 border-white' style={{ width: '90px', border: '5px solid #e1dcdc' }} />
                    </div>

                    <div className='bg-gray-100 rounded-t-2xl h-1/6 pointer overflow-hidden'>
                        <img src={bg} alt=""></img>
                    </div>

                    <div className='px-3  text-gray-900 items-center dark:text-gray-300' style={{ marginTop: '5rem' }}>
                        <div className='grid grid-cols-5 gap-4'>
                            <label className='col-span-1'>Name: </label>
                            <input type="text" className="col-span-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter First Name" />
                            <input type="text" className="col-span-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter Last Name" />
                        </div>

                        <div className='grid grid-cols-5 gap-4 mt-3'>
                            <label className='col-span-1'>Username: </label>
                            <input type="text" className="col-span-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter Username" />
                        </div>

                        <div className='grid grid-cols-5 gap-4 mt-3'>
                            <label className='col-span-1'>Email: </label>
                            <input type="email" className="col-span-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter Email" />
                        </div>
                        <div className='grid grid-cols-5 gap-4 mt-3'>
                            <div className='col-span-3 gap-5 flex mt-3'>
                                <img src={UserLogo} alt="user" className='w-14 h-14 rounded-full' />
                                <div className='flex justify-center items-center gap-3'>
                                    <label className="flex gap-2 justify-between items-center border py-1 px-4 rounded-lg 
                                    text-gray-800 dark:bg-gray-700 dark:text-gray-300 cursor-pointer dark:hover:bg-gray-600
                                    dark:hover:text-gray-200 hover:text-gray-900 hover:bg-gray-200">
                                        <MdFileUpload />
                                        <span>Select File</span>
                                        <input type="file" className="hidden" />
                                    </label>
                                    <span className='text-gray-700 dark:text-gray-300 underline font-mono hidden'>profile.png</span>
                                </div>
                            </div> 
                            <div className='col-span-2 flex items-center'>                           
                                <input type="text" className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter Role" />
                            </div>
                        </div>
                        <div className='mr-2 mt-5 flex justify-between'>
                            <div className='float-start '>
                                <button className='border text-red-900 flex items-center font-bold rounded-lg px-3 py-2 hover:bg-gray-50 dark:bg-blue-200 dark:text-gray-800'>
                                    <BsFillTrash3Fill /> <span className='ml-1'>Delete User</span>
                                </button>
                            </div>
                            <div className='flex gap-2'>
                                <button className='border border-black rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-900 dark:bg-blue-200 dark:text-gray-800' onClick={toggleUserModal}>Cancel</button>
                                <button className='border rounded-lg px-3 py-2 bg-gray-800 text-white dark:bg-blue-200 dark:text-gray-800'>Save Changes</button>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserData