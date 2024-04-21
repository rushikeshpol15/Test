import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Styles/Home.css';
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
function UserHome()
{
    
    let[allDatabaseInfo,setAllDatabaseInfo]=useState([]);
    let[email,setEmail]=useState('');
    let[role,setRole]=useState('');
    let[passengername,setPassengerName]=useState('');
    let[fromStation,setFromStation]=useState('');
    let[toStation,setToStation]=useState('');
    let[passengerAge,setPassengerAge]=useState('');
    let[gender,setGender]=useState('male');
    let navigate=useNavigate();

    // let allUsersdata=useSelector((state)=>state.setData);

    useEffect(()=>{
        setEmail(localStorage.getItem('email'));
        setRole(localStorage.getItem('role'));
    },[]);

    // useEffect(()=>{
    //     if(localStorage.getItem('email')==null)
    //     {
    //         navigate('/signin')
    //     }
    // },[])

    async function handleCraeteTicket()
    {
        try {
            if(passengername=='' || fromStation=='' || toStation=='' || passengerAge=='' || gender=='')
            {
                Swal.fire({
                    title:'Error',
                    text: "Please Enter All Details",
                    icon: "error",
                  });
                  return;
            }

            let obj={
                'user':email,
                'passengerName':passengername,
                'fromStation':fromStation,
                'toStation':toStation,
                'passengerAge':passengerAge,
                'gender':gender,
                'status':'created',
                'taskAssigned':"not Assigned"
            }

            let APIResponse=await axios.post('http://localhost:3000/tickets',obj);

            // if(APIResponse.data)
            // {
                Swal.fire({
                    title:'success',
                    text: "Tickets Created Successfully",
                    icon: "success",
                    timer:'1500'
                  });
                  return;
            // }

        } catch (error) {
            console.log(error);
        }
    }

    function handleLogOut()
    {
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        navigate('/signin');
    }

   
    return(
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active">Home</Link>
                            <Link to='/user-tickets' className="nav-link">Your Tickets</Link>
                            {/* {role=='supporter'? <Link to='/contact-us' className="nav-link">Queries</Link>:null} */}

                        </div>
                        <div className=" ms-auto text-light">{email}</div>
                        <div className="ms-sm-3 logoutBtn" style={{cursor:'pointer'}} onClick={handleLogOut}>Log Out</div>

                    </div>
                </div>
            </nav>

            <section className="home-section-container">
                <div className="container border border-dark rounded-1 p-3">
                    <h1>Create Ticket</h1>
                    <div className="row mt-4">
                        <div className="col-sm-6 col-12">
                            <form>

                                <div className="form-floating mb-2">
                                    <input type="text" value={passengername} onChange={(e)=>{setPassengerName(e.target.value)}} className="form-control" id="floatingInput" placeholder="tournamentName" required autoComplete='off' />
                                    <label htmlFor="floatingInput">Passenger Name</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input type="text" value={fromStation} onChange={(e)=>{setFromStation(e.target.value)}}  className="form-control" id="floatingInput" placeholder="tournamentName" required autoComplete='off' />
                                    <label htmlFor="floatingInput">From Station</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input type="text" value={toStation} onChange={(e)=>{setToStation(e.target.value)}} className="form-control" id="floatingInput" placeholder="tournamentName" required autoComplete='off' />
                                    <label htmlFor="floatingInput">To Station</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input type="number" value={passengerAge} onChange={(e)=>{setPassengerAge(e.target.value)}} className="form-control input-number" id="floatingInput" placeholder="tournamentName" required autoComplete='off' />
                                    <label htmlFor="floatingInput">Passenger Age</label>
                                </div>

                                <div className="mt-3">Select Gender :</div>
                                <div className="form-check mt-2">
                                    <input className="form-check-input" onChange={(e)=>{setGender('male')}} type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Male
                                        </label>
                                </div>
                                <div className="form-check mb-4">
                                    <input className="form-check-input" onChange={(e)=>{setGender('female')}} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Female
                                        </label>
                                </div>

                                <button className="create-ticket-btn" onClick={handleCraeteTicket}>Create Ticket</button>

                            </form>
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

export default UserHome;