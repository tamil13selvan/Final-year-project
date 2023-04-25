import React,{ useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Viewmore from './ViewMore';


const BookingForm = ({cusername, username,props}) => {
   
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const serviceType = searchParams.get('serviceType');
const serviceId = searchParams.get('serviceId');
const provider = searchParams.get('provider');
 
  console.log(serviceType);
  console.log(provider);

    // const { state } = useLocation();
    
    // console.log(se  rviceType);
    // const serviceId = state ? state.serviceId : "";

    const loggedInUsername = Cookies.get('cusername') || Cookies.get('username'); 

  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [cleaningType, setcleaningType] = useState('');
  const [currentAddress, setcurrentAddress] = useState('');
  const [newAddress, setnewAddress] = useState('');
  const [items, setitems] = useState('');
  const [noOfRooms, setnoOfRooms] = useState('');
  const [surfaceArea, setsurfaceArea] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    console.log(provider);

     const token = Cookies.get('token');
     const refreshToken = Cookies.get('refreshToken');

     const bookingData = {
        cusername:loggedInUsername,
        phone,
        address,
        date,
        time,
        serviceType: serviceType,
        serviceId: serviceId,
        provider:  provider,
        cleaningType,
        noOfRooms,
        surfaceArea,
        currentAddress,
        newAddress,
        items
      };
    
      if (serviceType === 'cleaning') {
        bookingData.cleaningType = cleaningType;
        bookingData.noOfRooms = noOfRooms;
        bookingData.surfaceArea = surfaceArea;
      } else if (serviceType === 'relocation') {
        bookingData.currentAddress = currentAddress;
        bookingData.newAddress = newAddress;
        bookingData.items = items;
      }
    try {
        
      const cusername = Cookies.get('cusername')
      console.log(cusername);
      const resp = await axios.post("http://localhost:1234/user/book_services", bookingData, {
      headers:{
        Authorization:`Bearer $(token)`,
        'x-refresh-token': refreshToken,
      },
    }
  )
      console.log(resp)
      window.location = '/'
      alert("Service booked Successfully")
    } catch (error) {
      console.log(error.response);
    }
     
  };


    return (

        <div id='page' className='row mx-3'>
            <div className="col-md-4 border border-1 p-4 mt-5 "  style={{ backgroundColor: '#fff'}}>
                <form onSubmit={handleSubmit}>
                <p>Logged in as: {loggedInUsername}</p>
                    <h2>BOOKING FORM</h2>
                    <p>Provider: {provider}</p>


                    <Form.Group className="mb-4" controlId="phone">
                        <Form.Label>Mobile number</Form.Label>
                        <Form.Control type="number" placeholder="Enter phone number" value={phone} onChange={(e) => setphone(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setaddress(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter date" value={date} onChange={(e) => setdate(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" placeholder="Enter time" value={time} onChange={(e) => settime(e.target.value)} required />
                    </Form.Group>
                    
                    {serviceType === 'cleaning' && (
                        <>
                   <Form.Group className="mb-4" controlId="cleaningType">
                  <Form.Label>Cleaning Type</Form.Label>
                 <Form.Control as="select" value={cleaningType} onChange={(e) => setcleaningType(e.target.value)} required>
                     <option value="">Select cleaning type</option>
                     <option value="deepcleaning">Deep Cleaning</option>
                     <option value="normalcleaning">Normal Cleaning</option>
                     <option value="disinfect">Disinfect</option>
                 </Form.Control>
                </Form.Group>


                    <Form.Group className="mb-4" controlId="noOfRooms">
                        <Form.Label>Number of Rooms</Form.Label>
                        <Form.Control type="number" placeholder="Enter number of rooms" value={noOfRooms} onChange={(e) => setnoOfRooms(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="surfaceArea">
                        <Form.Label>Surface Area</Form.Label>
                        <Form.Control type="number" placeholder="Enter surface area to be cleaned" value={surfaceArea} onChange={(e) => setsurfaceArea(e.target.value)} required />
                    </Form.Group>
                    </>
                    )}
                    
                    {serviceType === 'relocation' && (
                     <>
                    <Form.Group className="mb-4" controlId="currentAddress">
                        <Form.Label>Current Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter current address" value={currentAddress} onChange={(e) => setcurrentAddress(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="newAddress">
                        <Form.Label>New Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter relocating address" value={newAddress} onChange={(e) => setnewAddress(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="items">
                        <Form.Label>Items to be moved</Form.Label>
                        <Form.Control type="text" placeholder="Enter items to be cleaned" value={items} onChange={(e) => setitems(e.target.value)} required />
                    </Form.Group>
                    </>
                    )}
                    
                    <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary">
                          Book Service
                    </button>
                    </div>

                    </form>
                    </div>
                    </div>

    );
}

export default BookingForm


