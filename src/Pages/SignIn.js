import "../Styles/SignUp SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import google from "./google.png";
import github from "./github.png";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';

function SignIn(params) {
    let[email,setEmail]=useState('');
    let[password,setPassword]=useState('');
    let[passwordState,setPasswordState]=useState(false);
    let[invalidEmail,setInvalidEmail]=useState(false);
    let[invalidPassword,setInvalidPassword]=useState(false);


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
            if( localStorage.getItem('role')=='user')
            {
                navigate('/userhome');
            }
            if( localStorage.getItem('role')=='supporter')
            {
                navigate('/supporterhome');
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


    function handleEmail(e)
    {
        setEmail(e.target.value);
        setInvalidEmail(false);
    }

    function handlePassword(e)
    {
        if(e.key==='Enter')
        {
            handleSignin();
        }
        setPassword(e.target.value); 
        setInvalidPassword(false);
    }


    function handleSignin()
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

            let regx=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

            if(!regx.test(email))
            {
                setInvalidEmail(true);
                return;
            }
            
            let flag=0;
            
            allDatabaseInfo.forEach((element,index)=>{
                    if(email==element.email&&password==element.password)
                    {
                        Swal.fire({
                            title:'Success',
                            text: "User "+email+" Login Successfully",
                            icon: "success",
                            timer:1000
                          });
                          flag=1;
                          localStorage.setItem('email',element.email);
                          localStorage.setItem('role',element.role);
                          if(element.role=='admin')
                          {
                              navigate('/adminhome');
                          }
                          if(element.role=='user')
                          {
                              navigate('/userhome');
                          }
                          if( localStorage.getItem('role')=='supporter')
                          {
                              navigate('/supporterhome');
                          }
                          return;
                    }
                })
            
                if(flag==0)
                {
                    Swal.fire({
                        title:'Error',
                        text: "Invalid Email or Password",
                        icon: "error",
                      });
                      return;
                }
                
            
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
         <div className="sign-up-outer-container">
            <div className="sign-up-box">
                
                <h3>Sign In</h3>

                <div className="emailId-container">
                    <FontAwesomeIcon icon={faUser} style={{color: "black",}} />
                    <input type="text" placeholder=" " onChange={handleEmail} id="email" className="emailId-input"/>
                    <label htmlFor="email" className="email-label">Email</label>
                </div>
                {invalidEmail?<div className="text-danger">Please Enter Valid Email</div>:null}

                <div className="emailId-container">
                    <FontAwesomeIcon icon={faLock} style={{color: "#0a0a0a",}} />
                    <input type={(passwordState)?"text":"password"} placeholder=" " onChange={handlePassword} id="password" className="password-input"/>
                    <label htmlFor="password" className="password-label">Password</label>
                   {passwordState ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "#0d0d0d",cursor:"pointer"}} onClick={()=>{setPasswordState(!passwordState)}} />
                    :<FontAwesomeIcon icon={faEye} style={{color: "#0d0d0d",cursor:"pointer"}} onClick={()=>{setPasswordState(!passwordState)}} />}
                </div>
                {invalidPassword?<div className="text-danger">Password must be 8 characters long</div>:null}

               
                  <button className="sign-up-button" onClick={handleSignin}>Sign In</button>
    
                <div className="sign-in-span-container">
                    <span>Don't have an account</span>
                    <span className="sign-in-span" onClick={()=>{navigate('/')}}>Sign Up</span>
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
export  default SignIn;