import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Styles/Home.css';
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
function AdminHome()
{
    
    let[email,setEmail]=useState('');
    let[role,setRole]=useState('');
    let[changeTicketStatus,setChangeTicketStatus]=useState('');
    let[forChangeStatusReference,setForChangeReference]=useState('');
    let[nameInput,setNameInput]=useState('');
    let navigate=useNavigate();

    // let allUsersdata=useSelector((state)=>state.setData);

    useEffect(()=>{
        setEmail(localStorage.getItem('email'));
        setRole(localStorage.getItem('role'));
    },[]);

    useEffect(()=>{
        if(localStorage.getItem('email')==null)
        {
            navigate('/signin')
        }
    },[])

   

    function handleLogOut()
    {
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        navigate('/signin');
    }

    // for admin 
    let[userTickets,setUserTickets]=useState([]);
    let[tempUserTickets,setTempUesrTickets]=useState([]);

    useEffect(()=>{
        getUserTickets();
    },[]);

    useEffect(()=>{
        setTempUesrTickets(userTickets);
    },[userTickets])

    async function getUserTickets()
    {
        try {
            let APIResponse=await axios.get('http://localhost:3000/tickets');

            if(APIResponse.data)
            {
                // dispatch(setUserTicketDetailsAction(temp));
                // APIResponse.data.forEach((element)=>{
                //     let obj=element;
                //     if(element.taskAssigned=='not Assigned')
                //     {
                //         element.taskAssigned=<button className="task-assign-btn" onClick={()=>{handleAssignTask(obj)}}>Assign Task</button>
                //     }
                //     let temp=element.status;
                //     element.status=<button className="status-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{setForChangeReference(obj)}}>{temp}</button>
                // })
                console.log('tickets all :',APIResponse.data);
                    setUserTickets(APIResponse.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAssignTask(obj)
    {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to assign task to Tech Supporter",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, assign it"
              }).then(async(result) => {
                if (result.isConfirmed) {
                let payload={
                    ...obj,
                    "taskAssigned":"Assigned"
                }
                let APIResponse=await axios.put('http://localhost:3000/tickets/'+ obj.id,payload);

                if(APIResponse.data)
                {
                    getUserTickets();
                        Swal.fire({
                          title: "Success",
                          text: "task successfully assigned.",
                          icon: "success"
                        });
                }

                } 
              });
              
        } catch (error) {
            console.log(error);
        }
    }

    async function updateTicketStatus()
    {
        try {
            let payload={
                ...forChangeStatusReference,
                "status":changeTicketStatus
            }
            let APIResponse=await axios.put('http://localhost:3000/tickets/'+ forChangeStatusReference.id,payload);

            if(APIResponse.data)
            {
                getUserTickets();
            }
        } catch (error) {
            console.log(error);
        }
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
            selector:row=>row.passengerAge,
        },
        {
            name:'Gender',
            selector:row=>row.gender
            
        },
        {
            name:'Status',
            selector:row=>{
                return <button className="status-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{setForChangeReference(row)}}>{row.status}</button>
            }
        },
        {
            name:'Task Assigned',
            selector:row=>{
                return <button className="task-assign-btn" onClick={()=>{handleAssignTask(row)}} disabled={row.taskAssigned=='Assigned'}>{row.taskAssigned}</button>
                //  
            }
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

  useEffect(()=>{
    if(nameInput=='')
    {
        setTempUesrTickets(userTickets);
    }
    else{
        let filteredRecords=tempUserTickets.filter((element)=>{
            let a=element.passengerName.toLowerCase();
            let b=nameInput.toLowerCase();
            
            return a.includes(b);
        })
        setTempUesrTickets(filteredRecords);
    }
  },[nameInput])
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
                            <Link to='/available-users' className="nav-link">Available Users</Link>
                            {/* {role=='supporter'? <Link to='/contact-us' className="nav-link">Queries</Link>:null} */}

                        </div>
                        <div className=" ms-auto text-light">{email}</div>
                        <div className=" ms-sm-3 logoutBtn" style={{cursor:'pointer'}} onClick={handleLogOut}>Log Out</div>

                    </div>
                </div>
            </nav>
           
         <section className="home-section-container">
                <h1 className="text-center">All Tickets Details</h1>
                <div className="text-end mb-3 pe-5">
                    <input type="text" placeholder="Search Pasenger Name" value={nameInput} className='p-2 rounded-1' style={{outline:'none',border:'1px solid grey'}} onChange={(e)=>{setNameInput(e.target.value)}}/>
                </div>
                <div style={{width:'95%',overflow:'hidden'}} className="mx-auto">
                        <DataTable columns={column} data={tempUserTickets} customStyles={customeStyle} pagination/>

                </div>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel"></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h4 className='mb-3'>Update Ticket Status</h4>
                                <button className={(changeTicketStatus=='confirmed')?"btn btn-success d-block mb-2":"btn d-block mb-2 btn-primary"} onClick={()=>{setChangeTicketStatus('confirmed')}}>confirmed</button>
                                <button className={(changeTicketStatus=='waitlisted')?"btn btn-success d-block mb-2":"btn d-block mb-2 btn-primary"} onClick={()=>{setChangeTicketStatus('waitlisted')}}>waitlisted</button>
                                <button className={(changeTicketStatus=='canceled')?"btn btn-success d-block mb-2":"btn d-block mb-2 btn-primary"} onClick={()=>{setChangeTicketStatus('canceled')}}>canceled</button>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={()=>{updateTicketStatus()}} data-bs-dismiss="modal">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminHome;