import {React, useState, useContext} from 'react'
import SignupImg from '../../assets/Signup.jpg';
import BackgroundImg from '../../assets/bg01.jpg';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiCurrencyCircleDollarDuotone } from "react-icons/pi";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaImagePortrait } from "react-icons/fa6";
import { GiCaptainHatProfile } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import HandleUploads from "../../components/Shared/HandleUploads";
import { Link } from "react-router-dom";
import Input from './Input';
import {AlertContext} from "../../context/shared/AlertContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Signup() {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    let nevigate = useNavigate();
    const { showAlert } = useContext(AlertContext);
    const [processing, setProcessing] = useState(false);
    const [formData, setformData] = useState({
        username: "",
        email: "",
        password: "",
        profileImage: null,
        tag: ""
    });
    const [error, setError] = useState({
        type: "",
        message: ""
    });
    const handleSubmit = async ()=>{
        setProcessing(true);
        // Validate all fields
        if (!formData.username || !formData.email || !formData.password || !formData.tag || !formData.profileImage) {
            showAlert("All fields are required!", "error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError({type: "email", message: "Enter a valid email address"});
            return;
        }

        // Password validation (at least 6 chars, 1 special, 1 number, 1 letter)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError({type: "password", message: "Password must be at least 6 characters and include 1 letter, 1 number, and 1 special character."});
            return;
        }

        const uploadedImageUrl = await HandleUploads({ file: formData.profileImage });
        
        if(!uploadedImageUrl){
            showAlert("Something went wrong while uploading profile!...", "error");
        }
        //setformData({...formData, profileImage: uploadedImageUrl});

        const response = await fetch(`${backendURL}/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...formData, profileImage: uploadedImageUrl}),
          });
        const json = await response.json();
        console.log(json);
        if(json.status){
            nevigate('/');
            showAlert(json.message, "success");
        }
        else{
            showAlert(json.errors, "error");
        }
        setProcessing(false);
    }
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
                    <Input placeholder='username' type='text' Icon={FaUser} onChange={(e) => setformData({...formData, username: e.target.value})}/>
                    <Input placeholder='email' type='email' Icon={MdEmail} onChange={(e) => setformData({...formData, email: e.target.value})}/>
                    {error.type==="email" && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
                    <Input placeholder='password' type='password' Icon={RiLockPasswordLine} onChange={(e) => setformData({...formData, password: e.target.value})}/>
                    {error.type==="password" && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
                    <Input placeholder='role' type='text' Icon={GiCaptainHatProfile} onChange={(e) => setformData({...formData, tag: e.target.value})}/>
                    <Input placeholder='' type='file' Icon={FaImagePortrait} onChange={(e) => setformData({...formData, profileImage: e.target.files[0]})} />
                    
                    <button onClick={handleSubmit} className='mt-5 flex rounded justify-center items-center gap-3 w-full bg-rose-700 text-white p-2 cursor-pointer'>
                        <span className={`font-semibold cursor-pointer ${processing && "hidden"}`}>Signup</span>
                        <SiGnuprivacyguard className={`text-2xl ${processing && "hidden"}`}/>
                        <AiOutlineLoading3Quarters className={`animate-spin text-4xl text-white-500 ${processing || "hidden"}`} />
                    </button>    
                    <div className='text-center mt-5 text-sm'>
                        <span>Already have an account? <Link to='/' className='underline cursor-pointer'>Login here</Link></span>
                    </div>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup