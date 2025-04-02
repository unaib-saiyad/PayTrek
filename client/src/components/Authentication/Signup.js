import React from 'react'
import SignupImg from '../../assets/Signup.jpg';
import BackgroundImg from '../../assets/bg01.jpg';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiCurrencyCircleDollarDuotone } from "react-icons/pi";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaImagePortrait } from "react-icons/fa6";
import { GiCaptainHatProfile } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

import { Link } from "react-router-dom";
import Input from './Input';
function Signup() {
  return (
    <div className={`bg-gray-950 h-screen  bg-cover bg-center w-full p-8`}>
        <img src={BackgroundImg} alt="" className='absolute top-0 left-0 h-screen w-screen z-0'/>
        <div className='grid grid-cols-7 bg-white h-full rounded-2xl z-10 relative'>
            <div className="col-span-3 md:block sm:hidden overflow-hidden rounded-l-2xl">
                <img className='max-w-full h-full' src={SignupImg} alt="Login"/>
            </div> 
            <div className="md:col-span-4 sm:col-span-7 flex flex-col p-6 bg-opacity-50 justify-center items-center">

                <div className='grid grid-cols-3 items-center'  style={{"width": '70%'}}>
                    <h1 className='col-span-2 font-bold text-rose-700 text-4xl '>Welcome to PayTrek</h1>
                    <PiCurrencyCircleDollarDuotone className='text-7xl col-span-1 text-rose-400'/>
                </div>

                <div className='w-64' style={{"width": '70%'}}>
                    <Input placeholder='username' type='text' Icon={FaUser}/>
                    <Input placeholder='email' type='email' Icon={MdEmail}/>
                    <Input placeholder='password' type='password' Icon={RiLockPasswordLine}/>
                    <Input placeholder='role' type='text' Icon={GiCaptainHatProfile}/>
                    <Input placeholder='' type='file' Icon={FaImagePortrait}/>
                    
                    <Link to="/" className='mt-5 flex rounded justify-center items-center gap-3 w-full bg-rose-700 text-white p-2'>
                        <span className='font-semibold '>Signup</span>
                        <SiGnuprivacyguard className='text-2xl'/>
                    </Link>    
                    <div className='text-center mt-5 text-sm'>
                        <span>Already have an account? <Link to='/' className='underline cursor-pointer'>Signup here</Link></span>
                    </div>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup