import React, { useState, useEffect, useContext }  from 'react'

import { MdFileUpload } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";
import UserLogo from '../../assets/user01.png';
import bg from '../../assets/bg01.jpg';
import HandleUploads from "../../components/Shared/HandleUploads";
import axios from "axios";
import { useUser } from '../../context/shared/UserContext';
import {AlertContext} from "../../context/shared/AlertContext";

function UserData({ isOpen, toggleUserModal }) {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const { showAlert } = useContext(AlertContext);
    const {user, loading, triggerAuthUpdate, refetchUser } = useUser();
    const [userData, setUserData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    useEffect(() => {
        if (user && !loading) {
            setUserData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            username: user.username || "",
            email: user.email || "",
            profileImage: user.profileImage || "",
            tag: user.tag || ""
            });
        }
        }, [user, loading]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Set file in state (to maybe upload later)
            setUserData({ ...userData, profileImage: file });
        
            // Preview the image locally
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
        };

    const handleUpdate = async () => {
        try {
            let updatedProfileImage = userData.profileImage;
        
            // 🧠 If it's a new image (File), upload it first
            if (userData.profileImage instanceof File) {
            updatedProfileImage = await HandleUploads({ file: userData.profileImage });
        
            if (!updatedProfileImage) {
                showAlert("Image upload failed. Try again.", 'error');
                return;
            }
            }
        
            const updatedUser = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            email: userData.email,
            tag: userData.tag,
            profileImage: updatedProfileImage
            };
        
            const res = await axios.put(`${backendURL}/updateUser`, updatedUser, {
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
            });
        
            if (res.data.success) {
            showAlert("User updated successfully ✅", 'success');
            // 🔁 Trigger refetch of user context
            refetchUser();
            toggleUserModal(); // close modal if needed
            } else {
            showAlert("Update failed. Please try again.", 'error');
            }
        } catch (err) {
            console.error("Update error:", err);
            showAlert("Something went wrong while updating.", 'error');
        }
        };
    
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            return;
        }
        
        try {
            const res = await axios.delete(`${backendURL}/deleteUser`, {
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
            });
        
            if (res.data.success) {
            showAlert("User deleted successfully.", 'success');
            localStorage.removeItem("token");
            triggerAuthUpdate(null); // clear user context
            toggleUserModal();
            // Redirect to login or home
            window.location.href = "/";
            } else {
            showAlert("Failed to delete user.", 'error');
            }
        } catch (err) {
            console.error("Delete error:", err);
            showAlert("Something went wrong while deleting account.", 'error');
        }
        };
          
        
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg w-full md:w-3/6 sm:w-full h-5/6 flex flex-col">
                <div className="flex flex-col h-full rounded-2xl">

                    <div className='absolute h-1/6'>
                        <img src={(!loading && user)? user.profileImage: UserLogo} alt="user" className='rounded-full relative top-1/2 left-1.5 border-white' style={{ width: '90px', height: '90px', border: '5px solid #e1dcdc' }} />
                    </div>

                    <div className='bg-gray-100 rounded-t-2xl h-1/6 pointer overflow-hidden'>
                        <img src={bg} alt=""></img>
                    </div>

                    <div className='px-3  text-gray-900 items-center dark:text-gray-300' style={{ marginTop: '5rem' }}>
                        <div className='grid grid-cols-5 gap-4'>
                            <label className='col-span-1'>Name: </label>
                            <input type="text" value={userData?.firstName || ""} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} 
                            className="col-span-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter First Name" />
                            <input type="text" value={userData?.lastName || ""} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                            className="col-span-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter Last Name" />
                        </div>

                        <div className='grid grid-cols-5 gap-4 mt-3'>
                            <label className='col-span-1'>Username: </label>
                            <input type="text"  value={userData?.username || ""} onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            className="col-span-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter Username" />
                        </div>

                        <div className='grid grid-cols-5 gap-4 mt-3'>
                            <label className='col-span-1'>Email: </label>
                            <input type="email"  value={userData?.email || ""} onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="col-span-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter Email" />
                        </div>
                        <div className='grid grid-cols-5 gap-4 mt-3'>
                            <div className='col-span-3 gap-5 flex mt-3'>
                                <img src={ imagePreview || (typeof userData?.profileImage === "string" && userData.profileImage) || UserLogo } alt="user" className='w-14 h-14 rounded-full' />
                                <div className='flex justify-center items-center gap-3'>
                                    <label className="flex gap-2 justify-between items-center border py-1 px-4 rounded-lg 
                                    text-gray-800 dark:bg-gray-700 dark:text-gray-300 cursor-pointer dark:hover:bg-gray-600
                                    dark:hover:text-gray-200 hover:text-gray-900 hover:bg-gray-200">
                                        <MdFileUpload />
                                        <span>Select File</span>
                                        <input type="file" onChange={handleImageChange} className="hidden" />
                                    </label>
                                    <span className='text-gray-700 dark:text-gray-300 underline font-mono hidden'>profile.png</span>
                                </div>
                            </div> 
                            <div className='col-span-2 flex items-center'>                           
                                <input type="text" value={userData?.tag || ""} onChange={(e) => setUserData({ ...userData, tag: e.target.value })}
                                className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900" placeholder="Enter Role" />
                            </div>
                        </div>
                        <div className='mr-2 mt-5 flex justify-between'>
                            <div className='float-start '>
                                <button onClick={handleDelete} className='border text-red-900 flex items-center font-bold rounded-lg px-3 py-2 hover:bg-gray-50 dark:bg-blue-200 dark:text-gray-800'>
                                    <BsFillTrash3Fill /> <span className='ml-1'>Delete User</span>
                                </button>
                            </div>
                            <div className='flex gap-2'>
                                <button className='border border-black rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-900 dark:bg-blue-200 dark:text-gray-800' onClick={toggleUserModal}>Cancel</button>
                                <button className='border rounded-lg px-3 py-2 bg-gray-800 text-white dark:bg-blue-200 dark:text-gray-800' onClick={handleUpdate}>Save Changes</button>
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