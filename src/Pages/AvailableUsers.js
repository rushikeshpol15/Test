import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Styles/Home.css';
import Swal from "sweetalert2";

function AvailableUsers()
{
    let[email,setEmail]=useState('');

    let[allDatabaseInfo,setAllDatabaseInfo]=useState([]);
    let navigate=useNavigate();

    useEffect(()=>{
        setEmail(localStorage.getItem('email'));
    },[]);
    useEffect(()=>{
        fetchData();
    },[]);

    // useEffect(()=>{
    //     if(localStorage.getItem('email')==null)
    //     {
    //         navigate('/signin')
    //     }
    // },[])

    async function fetchData()
    {
      try {
        let APIResponse=await axios.get('http://localhost:3000/users');

        setAllDatabaseInfo(APIResponse.data);
        
      } catch (error) {
        console.log(error);
      }
    }
    let column=[
        {
            name:'Name',
            selector:row=>row.name
        },
        {
            name:'Email',
            selector:row=>row.email
        },
        {
            name:'Password',
            selector:row=>row.password
        },
        {
            name:'Role',
            selector:row=>row.role
        },
        {
            name:'Action',
            selector:row=>{
                return <div onClick={()=>{handleDeleteuser(row)}}><FontAwesomeIcon icon={faTrash} style={{color: "black",cursor:'pointer'}} /></div>
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

  async function handleDeleteuser(row)
  {
    try {
          if (row.role == 'supporter' || row.role == 'admin') {
              Swal.fire({
                  title: 'Error',
                  text: "This Account Can't Be Deleted",
                  icon: "error"
              });
              return;
          }

          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {

            // let allusers = allDatabaseInfo;
            // let filteredRecords = allusers.filter((element, index) => {
            //     return element.email != row.email
            // })
            // setAllDatabaseInfo(filteredRecords);
            if (result.isConfirmed) {
                let APIResponse = await axios.delete('http://localhost:3000/users/'+row.id);
  
                if (APIResponse.data) {
                    fetchData();
                
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your Record has been deleted.",
                    icon: "success"
                  });
                }
              }
           
          });
         
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
                            <Link to='/adminhome' className="nav-link ">Home</Link>
                            <Link  className="nav-link active">Available Users</Link>

                        </div>
                        <div className=" ms-auto text-light">{email}</div>
                        <div className=" ms-sm-3 logoutBtn" style={{cursor:'pointer'}} onClick={handleLogOut}>Log Out</div>

                    </div>
                </div>
            </nav>

            <section className="home-section-container">
                <div style={{width:'95%',overflow:'hidden'}} className="mx-auto">
                        <DataTable columns={column} data={allDatabaseInfo} customStyles={customeStyle} pagination/>

                </div>
            </section>
        </>
    )
}

export default AvailableUsers;