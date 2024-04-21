import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Styles/Home.css';
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { setUserTicketDetailsAction } from "../Actions/SetUserTicketDetails";

function UserTickets()
{
    let[email,setEmail]=useState('');
    let[role,setRole]=useState('');
    let[userTickets,setUserTickets]=useState([]);
    let[tempUserTickets,setTempUesrTickets]=useState([]);
    let navigate=useNavigate();
    let dispatch=useDispatch();
    // let reduxUserTickets=useSelector((state)=>state.setUserTickets);
    
    useEffect(()=>{
        setEmail(localStorage.getItem('email'));
        setRole(localStorage.getItem('role'));
        // setTempUesrTickets(reduxUserTickets);
    },[]);

    useEffect(()=>{
        getUserTickets();
    },[]);

    // useEffect(()=>{
    //     if(localStorage.getItem('email')==null)
    //     {
    //         navigate('/signin')
    //     }
    // },[])
    useEffect(()=>{
        let temp=[];

        userTickets.forEach((element,index)=>{
            let obj={};
            if(element.user==email)
            {
                console.log('correct :',element);
                temp.push(element);
            }
        })
        setTempUesrTickets(temp);
    },[userTickets])

    async function getUserTickets()
    {
        try {
            let APIResponse=await axios.get('http://localhost:3000/tickets');

            if(APIResponse.data)
            {
                // dispatch(setUserTicketDetailsAction(temp));
                    setUserTickets( APIResponse.data);
            }
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

    let column=[
        {
            name:'Passanger Name',
            selector:row=>row.passengerName
        },
        {
            name:'From Station',
            selector:row=>row.fromStation
        },
        {
            name:'To Station',
            selector:row=>row.toStation
        },
        {
            name:'Passanger Age',
            selector:row=>row.passengerAge
        },
        {
            name:'Gender',
            selector:row=>row.gender
            
        },
        {
            name:'Status',
            selector:row=>row.status
        },
    ];

  let customeStyle={
    headCells:{
        style:{
            backgroundColor:'black',
            color:'white'
        }
    },
    rows:{
        style:{
            fontSize:'0.9em'
        }
    }
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
                            <Link to='/userhome' className="nav-link ">Home</Link>
                            <Link  className="nav-link active">Your Tickets</Link>
                        </div>
                        <div className=" ms-auto text-light">{email}</div>
                        <div className=" ms-sm-3 logoutBtn" style={{cursor:'pointer'}} onClick={handleLogOut}>Log Out</div>

                    </div>
                </div>
            </nav>

            <section className="home-section-container">
                    <div style={{width:'95%',overflow:'hidden'}} className="mx-auto">
                        <DataTable columns={column} data={tempUserTickets} customStyles={customeStyle} pagination/>

                    </div>


            </section>
        </>
    )
}

export default UserTickets;