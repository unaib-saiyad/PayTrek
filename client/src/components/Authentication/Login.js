import React from 'react'
import LoginImg from '../../assets/Login.jpg';
import BackgroundImg from '../../assets/bg01.jpg';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiHandWavingDuotone } from "react-icons/pi";
import { BsRobot } from "react-icons/bs";
import {
    Link
} from "react-router-dom";
import Input from './Input';
function Login() {
    return (
        <div className={`bg-gray-950 h-screen  bg-cover bg-center w-full p-8`}>
            <img src={BackgroundImg} alt="" className='absolute top-0 left-0 h-screen w-screen z-0' />
            <div className='grid grid-cols-7 bg-white h-full rounded-2xl z-10 relative'>
                <div className="col-span-3 md:block sm:hidden overflow-hidden rounded-l-2xl">
                    <img className='max-w-full h-full' src={LoginImg} alt="Login" />
                </div>
                <div className="md:col-span-4 sm:col-span-7 flex flex-col p-6 bg-opacity-50 justify-center items-center">

                    <div className='grid grid-cols-3 items-center' style={{ "width": '70%' }}>
                        <h1 className='col-span-2 font-bold text-rose-700 text-4xl '>Welcome back to PayTrek</h1>
                        <PiHandWavingDuotone className='text-7xl col-span-1 text-rose-400' />
                    </div>

                    <div className='w-64' style={{ "width": '70%' }}>
                        <Input placeholder='username' type='text' Icon={FaUser}/>
                        <Input placeholder='password' type='password' Icon={RiLockPasswordLine}/>
                        
                        <div className='float-end my-1 mb-2'>
                            <span className='text-sm text-gray-600 cursor-pointer hover:text-gray-900 underline'>Forget Passwrod?</span>
                        </div>
                        <Link to="/dashboard" className='flex rounded justify-center items-center gap-3 w-full bg-rose-700 text-white p-2'>
                            <span className='font-semibold '>Login</span>
                            <BsRobot className='text-2xl' />
                        </Link>
                        <div className='text-center mt-5 text-sm'>
                            <span>New to PayTrek? <Link to='/signup' className='underline cursor-pointer'>Create an account</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login