import React from 'react'
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import {IoIosArrowForward} from 'react-icons/io';
import { MdAlternateEmail } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { GrSecure } from "react-icons/gr";
import { MdFileUpload } from "react-icons/md";


import UserLogo from '../../assets/user01.png';
function UserData({ isOpen, toggleUserModal}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg w-full md:w-3/5 sm:w-full h-4/5 flex flex-col">
            <div className="h-full flex flex-col">
                <div className='grid grid-cols-5 gap-4 pb-2 h-full p-3'>
                    <div className='col-span-2 border-r gap-4 h-full'>
                        <div className='flex items-center justify-start'>
                            <h3 className='text-gray-700 dark:text-gray-300'>joe.deore@gmail.com</h3>
                        </div>
                        <div className='mt-5 p-2 h-full pb-8 flex flex-col justify-between '>
                            <div>
                            <div className='my-2 bg-rose-50 text-violet-700 p-3 rounded-xl flex justify-between items-center cursor-pointer hover:text-violet-500 hover:bg-rose-200'>
                                <div className='flex items-center justify-start gap-3'>
                                    <FaUser />
                                    <h2 className='text-medium'>My Profile</h2>
                                </div>
                                <IoIosArrowForward/>
                            </div>
                            <div className='my-2 bg-gray-50 text-gray-700 p-3 rounded-xl flex justify-between items-center cursor-pointer hover:text-gray-500 hover:bg-gray-200
                            dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-500'>
                                <div className='flex items-center justify-start gap-3'>
                                    <MdAlternateEmail/>
                                    <h2 className='text-medium'>Email Address</h2>
                                </div>
                                <IoIosArrowForward/>
                            </div>
                            </div>
                            <div className='my-2 bg-gray-50 text-gray-700 p-3 rounded-xl flex justify-between items-center cursor-pointer hover:text-gray-500 hover:bg-gray-200
                            dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-500'>
                                <div className='flex items-center justify-start gap-3'>
                                <IoLogOutOutline />
                                    <h2 className='text-medium'>Logout</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='flex justify-between items-center'>
                            <h3 className='font-bold text-gray-800 dark:text-gray-200'>User Profie</h3>
                            <button onClick={toggleUserModal} className="bg-gray-200 dark:hover:text-gray-500 hover:text-gray-700 hover:bg-gray-300 p-1 rounded-full text-gray-500 dark:text-gray-300 dark:bg-gray-700">
                            <IoClose className='text-xl' />
                            </button>
                        </div>
                        <div className='mt-5'>
                            <div className='gap-5 flex'>
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
                            <div className='flex flex-col mt-5 text-gray-700 dark:text-gray-300 gap-1'>
                                <label>Username: </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter username" />
                            </div>
                            <div className='flex flex-col mt-5 text-gray-700 dark:text-gray-300 gap-1'>
                                <label>First Name: </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter first" />
                            </div>
                            <div className='mt-5 float-end mr-2'>
                                <button className='border rounded-lg px-3 py-2 bg-blue-500 text-white dark:bg-blue-200 dark:text-gray-800'>Save</button>
                            </div>
                        <div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='gap-1 bg-purple-200 text-gray-900 rounded-b-2xl flex justify-center items-center p-1/2'>
                    <GrSecure/>
                    <h3>Secured by PayTrek</h3>
                </div>
            </div>

        </div>
        </div>
    )
}

export default UserData