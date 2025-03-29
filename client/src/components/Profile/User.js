import React from 'react'
import UserLogo from '../../assets/user01.png'
function User() {
  return (
    <div className='flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-600 dark:text-gray-300'>
        <img src={UserLogo} alt="user image" className='w-14 h-14 rounded-full ' />
        <div>
            <h3 className='font-semibold text-2xl'>John Deo</h3>
            <p>Software Developer</p>
        </div>
    </div>
  )
}

export default User