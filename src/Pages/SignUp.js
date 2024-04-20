import "../Styles/SignUp SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faEye } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import google from "./google.png";
import github from "./github.png";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios'

function SignUp() { 
    let[email,setEmail]=useState('');
    let[password,setPassword]=useState('');
    let[confirmPassword,setConfirmPassword]=useState('');
    let[invalidEmail,setInvalidEmail]=useState(false);
    let[invalidPassword,setInvalidPassword]=useState(false);
    let[passwordState,setPasswordState]=useState(false);
    let[confirmPasswordState,setConfirmPasswordState]=useState(false);

    let[allDatabaseInfo,setAllDatabaseInfo]=useState([]);
    let navigate=useNavigate();

    // let allUsersdata=useSelector((state)=>state.setData);

    useEffect(()=>{
        fetchData();
    },[]);

    useEffect(()=>{
            if( localStorage.getItem('role')=='admin')
            {
                navigate('/adminhome');
            }
            else if( localStorage.getItem('role')=='user')
            {
                navigate('/userhome');
            }
    },[])

    async function fetchData()
    {
      try {
        let APIResponse=await axios.get('http://localhost:3000/users');
  
        setAllDatabaseInfo(APIResponse.data);
        
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
        console.log('all data inserted in state :',allDatabaseInfo);
    },[allDatabaseInfo])
    function handleEmail(e)
    {
        setEmail(e.target.value);
        setInvalidEmail(false);
    }

    function handlePassword(e)
    {
        setPassword(e.target.value); 
        setInvalidPassword(false);
    }

   
    async function handleSignUp()
    {
        try {
            if(email=='')
            {
                setInvalidEmail(true);
                return;
            }
            if(password.length<8)
            {
                setInvalidPassword(true);
                return;
            }
            if(password!=confirmPassword)
            {
                Swal.fire({
                    text: "password and confirm password should be same",
                    icon: "question"
                  });
                  return;
            }

            let regx=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

            if(!regx.test(email))
            {
                setInvalidEmail(true);
                return;
            }

            let flag=0;
            allDatabaseInfo.forEach((element,index)=>{
                if(email===element['email'])
                {
                    flag=1;
                }
            })

            if(flag==1)
            {
                Swal.fire({
                    title:'Error',
                    text: "User Already Existed",
                    icon: "error"
                  });
                  return;
            }
           
            let obj={
                'name':'user',
                'email':email,
                'password':password,
                'role':'user'
            }

            let APIResponse=await axios.post('http://localhost:3000/users',obj);
                console.log('APIResponse.data after signup :',APIResponse.data);
                if(APIResponse.data)
                {
                    setAllDatabaseInfo(APIResponse.data);
                    Swal.fire({
                        title:'Success',
                        text: "registered successfully",
                        icon: "success"
                      });
                    navigate('/signin');
                }

           

            
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        <div className="sign-up-outer-container">
            <div className="sign-up-box">
                
                <h3>Sign Up</h3>

               
                <div className="emailId-container">
                    <FontAwesomeIcon icon={faUser} style={{color: "black",}} />
                    <input type="text" placeholder=" " onChange={handleEmail} value={email} id="email" className="emailId-input"/>
                    <label htmlFor="email" className="email-label">Email</label>
                </div>
                {invalidEmail?<div className="text-danger">Please Enter Valid Email</div>:null}

                <div className="emailId-container">
                    <FontAwesomeIcon icon={faLock} style={{color: "#0a0a0a",}} />
                    <input type={(passwordState)?"text":"password"} placeholder=" " value={password} onChange={handlePassword} id="password" className="password-input"/>
                    <label htmlFor="password" className="password-label">Password</label>
                    <FontAwesomeIcon icon={faEye} style={{color: "#0d0d0d",cursor:"pointer"}} onClick={()=>{setPasswordState(!passwordState)}} />
                </div>
                {invalidPassword?<div className="text-danger">Password must be 8 characters long</div>:null}

                <div className="emailId-container">
                    <FontAwesomeIcon icon={faLock} style={{color: "#0a0a0a",}} />
                    <input type={(confirmPasswordState)?"text":"password"} placeholder=" " value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} id="confirmPassword" className="confirm-password-input"/>
                    <label htmlFor="confirmPassword" className="confirm-password-label">Confirm Password</label>
                    <FontAwesomeIcon icon={faEye} style={{color: "#0d0d0d",cursor:"pointer"}} onClick={()=>{setConfirmPasswordState(!confirmPasswordState)}}/>
                </div>
                
                <button className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
    
                <div className="sign-in-span-container">
                    <span>Already have an account</span>
                    <span className="sign-in-span" onClick={()=>{navigate('/signin')}}>Sign In</span>
                </div>

                <div className="hr-lines-container">
                    <div className="horizontal-line"></div>
                    <div>or</div>
                    <div className="horizontal-line"></div>
                </div>

                <div className="sign-in-with-container">
                    <img src={google} alt="google" className="sign-in-with-img" />
                    <div style={{fontWeight:"bold"}}>Sign In with Google</div>
                 </div>

                 <div className="sign-in-with-container">
                    <img src={github} alt="github" className="sign-in-with-img" />
                    <div style={{fontWeight:"bold"}}>Sign In with GitHub</div>
                 </div>

            </div>
        </div>
        </>
    )
}
export  default SignUp;