import React, { useState, useContext } from 'react'
import LoginImg from '../../assets/Login.jpg';
import BackgroundImg from '../../assets/bg01.jpg';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiHandWavingDuotone } from "react-icons/pi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsRobot } from "react-icons/bs";
import {
    Link
} from "react-router-dom";
import Input from './Input';
import { useNavigate } from "react-router-dom";
import {AlertContext} from "../../context/shared/AlertContext";

function Login() {
    let nevigate = useNavigate();
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const { showAlert } = useContext(AlertContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        type: "",
        message: ""
    });
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        setProcessing(true);
        e.preventDefault();
        setError({type: "", message: ""});

        // Email validation (basic check)
        if (!email) {
            setError({type: "email", message: "Email is required"});
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError({type: "email", message: "Enter a valid email address"});
            return;
        }

        // Password validation (at least 6 chars, 1 special, 1 number, 1 letter)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,}$/;
        if (!passwordRegex.test(password)) {
            setError({type: "password", message: "Password must be at least 6 characters and include 1 letter, 1 number, and 1 special character."});
            return;
        }

        const response = await fetch(`${backendURL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:email, password:password}),
          });
        const json = await response.json();
        if(json.status){
            localStorage.setItem('token', json.token);
            nevigate('/dashboard');
            showAlert(json.message, "success");
        }
        else{
            showAlert(json.error, "error");
        }
        setProcessing(false);
    };

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
                        <form onSubmit={handleSubmit}>
                            <Input placeholder='email' type='email' Icon={MdEmail} onChange={(e) => setEmail(e.target.value)} />
                            {error.type==="email" && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
                            <Input placeholder='password' type='password' Icon={RiLockPasswordLine} onChange={(e) => setPassword(e.target.value)}/>
                            {error.type==="password" && <p className="text-red-500 text-sm mt-2">{error.message}</p>}

                            <div className='float-end my-1 mb-2'>
                                <span className='text-sm text-gray-600 cursor-pointer hover:text-gray-900 underline'>Forget Passwrod?</span>
                            </div>
                            <button type='submit' className='flex rounded justify-center items-center gap-3 w-full bg-rose-700 text-white p-2'>
                                <span className={`font-semibold ${processing && "hidden"}`}>Login</span>
                                <BsRobot className={`text-2xl ${processing && "hidden"}`} />
                                <AiOutlineLoading3Quarters className={`animate-spin text-4xl text-white-500 ${processing || "hidden"}`} />
                            </button>
                        </form>
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