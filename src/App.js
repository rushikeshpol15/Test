import logo from './logo.svg';
import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SetDataAction } from './Actions/SetAllData';
import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import { Provider, useDispatch } from 'react-redux';
import Dashboard from './Pages/UserHome';
import ContactUs from './Pages/UserTickets';
import Home from './Pages/UserHome';
import UserTickets from './Pages/UserTickets';
import AvailableUsers from './Pages/AvailableUsers';
import UserHome from './Pages/UserHome';
import AdminHome from './Pages/AdminHome';
import SuppoterHome from './Pages/SupporterHome';
import PrivateHOC from './Pages/PrivateHOC';
import PrivateHOCComponent from './Pages/PrivateHOC';

function App() {
  let location=useLocation();
  let dispatch=useDispatch();

  async function fetchData()
  {
    try {
      let APIResponse=await axios.get('http://localhost:3000/users');

      dispatch(SetDataAction(APIResponse.data))
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[location])
  return (
    <>
          <Routes>
            <Route path='/' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            
            <Route path='/userhome' element={<PrivateHOCComponent role='user' cmp={UserHome}/>}/>
            <Route path='/user-tickets' element={<PrivateHOCComponent role='user' cmp={UserTickets}/>}/>

            <Route path='/adminhome' element={<PrivateHOCComponent role='admin' cmp={AdminHome}/>}/>
            <Route path='/available-users' element={<PrivateHOCComponent role='admin' cmp={AvailableUsers}/>}/>

            <Route path='/supporterhome' element={<PrivateHOCComponent role='supporter' cmp={SuppoterHome}/>}/>


          </Routes>

    </>
  );
}

export default App;
