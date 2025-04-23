import React from 'react'
import UserLogo from '../../assets/user01.png';
import { FaAngleDown } from "react-icons/fa";
import UserData from './UserData';
import { useUser } from '../../context/shared/UserContext';

function User({isOpen ,toggleUserModal}) {
  const {user, loading} = useUser();
  return (
    <>
    <div className='flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-600 dark:text-gray-300'>
        <img src={user? user.profileImage: UserLogo} alt="user" className='w-14 h-14 rounded-full ' />
        <div>
            <h3 className='font-semibold text-2xl'>{loading || user?.firstName} {loading || user?.lastName}</h3>
            <p>{loading || user?.tag}</p>
        </div>
        <div className='absolute' style={{right: '3rem'}}>
          <div className='cursor-pointer bg-gray-300 p-2 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:mt-3 transition-all duration-500'
          onClick={toggleUserModal}> 
            <FaAngleDown />
          </div>
        </div>
    </div>
    <UserData isOpen={isOpen} toggleUserModal={toggleUserModal} />
    </>
    
  )
}

export default User