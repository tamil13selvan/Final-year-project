import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Clogin from './components/client/Clogin';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Signup from './components/client/Signup';
import About from './components/About';
import Help from './components/Help';
import Alogin from './components/Admin/alogin';
import ProviderSignup from './components/contractor/ProviderSignup';
import BothSignup from './components/contractor/BothSignup';
import ClientPage from './components/client/ClientPage';
import Plogin from './components/contractor/ProviderLogin';
import Amain from './components/Admin/amain'; 
import UserList from './components/Admin/userList';
import PendingList from './components/Admin/pendingList';
import Services from './components/Services';
import ProviderPage from './components/contractor/ProviderPage';
import Booking from './components/client/Booking';
import AddService from './components/contractor/AddService';
import Viewmore from './components/client/ViewMore';
import PassReset from './components/client/PassReset';
import PassForgot from './components/client/PassForgot';
import BookingForm from './components/client/BookingForm';
import ViewServices from './components/Admin/viewServices';
import StatusCheck from './components/client/StatusCheck';
import ViewBookings from './components/contractor/ViewBookings';
import MyService from './components/contractor/MyService';
import Payment from './components/client/Payment';
import PreviousHistory from './components/client/PreviousHistory';

function App() {
  return (
  
    <div className='bg2img'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path='/clientsignup' element={<Signup/>}/>     
          <Route path='/login' element={<Clogin/>}/>
          <Route path='/ProviderLogin' element={<Plogin/>}/>
          <Route path='/about' element={<About/>}/>
          {/* <Route path='/help' element={<Help/>}/> */}
          <Route path='/providersignup' element={<ProviderSignup/>}/>
          <Route path='/bothsignup' element={<BothSignup/>}/>
          <Route path='/login/client' element={<ClientPage/>}/>
          <Route path='/alogin' element={<Alogin/>}/>
          {/* <Route path='/admin/welcome' element={<AdminPage/>}/>
          <Route path='/admin/welcome/details' element={<AdminOrder/>}/> */}
          <Route path='/services' element={<Services/>}/>
          <Route path='/userList' element={<UserList/>}/>
          <Route path='/pendingList' element={<PendingList/>}/>
          <Route path='/ProviderPage' element={<ProviderPage/>}/>
          <Route path='/amain' element={<Amain/>}/>
          <Route path='/Booking' element={<Booking/>}/>
          <Route path='/addService' element={<AddService/>} />
          <Route path='/service/:username' element = {<Viewmore/>}/>
          <Route path='/PassReset' element = {<PassReset/>} />
          <Route path='/PassForgot' element = {<PassForgot/>}/>
          <Route path='/BookingForm' element = {<BookingForm/>}/>
          <Route path='/ViewServices' element = {<ViewServices/>}/>
          <Route path='/StatusCheck' element = {<StatusCheck/>}/>
          <Route path='/ViewBookings' element = {<ViewBookings/>}/>
          <Route path='/MyService' element = {<MyService/>}/>
          <Route path='/Payment' element={<Payment/>}/>
          <Route path='/PreviousHistory' element = {<PreviousHistory/>} />
        </Routes>
      </BrowserRouter>
      <hr />
      <Footer />
    // </div>
    
  );
}
export default App;






          
         


