// import { React } from 'react';
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './AddService.css';

const AddService = ({username}) => {

  const [data, setData] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [operatingArea, setoperatingArea] = useState("");
  const [availability, setavailability] = useState([]);
  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState('');
  const [type, settype] = useState('');
  const [bhk, setbhk] = useState('');
  const [distance, setdistance] = useState('');
  const [pricing, setpricing] = useState('');
  const [duration, setduration] = useState('');
  const [requirements, setrequirements] = useState('');
  const [cleaningtype, setcleaningtype] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
     
     const token = Cookies.get('token');
     const refreshToken = Cookies.get('refreshToken');
    try {
      const username = Cookies.get('username')
      const resp = await axios.post("http://localhost:1234/service/add-a-service", {  title,
      description,
      operatingArea,
      availability,
      type,
      startTime,
      endTime,
      bhk,
      distance,
      pricing,
      duration,
      requirements,
      username,
      cleaningtype },
      {
      headers:{
        Authorization:`Bearer $(token)`,
        'x-refresh-token': refreshToken,
      },
    }
  )
      console.log(resp)
      window.location = '/'
      alert("Service added Successfully")
    } catch (error) {
      console.log(error.response);
    }
     
  };
  const handleOperatingAreaChange = (event) => {
    const { value } = event.target;
    setoperatingArea((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((item) => item !== value);
      } else {
        return [...prevValues, value];
      }
    });
  };

  const handleDaysChange = (event) => {
    const { value } = event.target;
    setavailability((prevValues) => {
      if(prevValues.includes(value)){
        return prevValues.filter((item) => item!== value);
      }else {
        return [...prevValues, value];
      }
    })
  }

  const handleChange = (event) => {
    settype(event.target.value);
  };

  const handlecleaningtype = (event) => {
    setcleaningtype(event.target.value);
  }

  const handlebhk = (event) => {
    setbhk(event.target.value);
  }
  const handleWorkingHoursChange = (event) => {
    setstartTime(event.target.value);
    setendTime(event.target.value);
  }


  return (
    <div id='page' className='row mx-3'>
    <form onSubmit={handleSubmit}>
      <div>
      <h4>Your username: {Cookies.get('username')}</h4>
      </div>
    <div className="col-md-4 border border-1 p-4 mt-5 "  style={{ backgroundColor: '#fff'}}>
      <div className="form-group">
        <label htmlFor="title">Service Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(event) => settitle(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(event) => setdescription(event.target.value)}
          required
        ></textarea>
      </div>
      <div className='form-group'>
      <label>
          Select a service type:
          <select value={type} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="cleaning">Cleaning</option>
            <option value="relocation">Relocation</option>
          </select>
        </label>
      </div>
    
      <div className="form-group">
        <label htmlFor="operatingArea">Operating Area:</label>
        <select
          className="form-control"
          id="operatingArea"
          value={operatingArea}
          onChange={handleOperatingAreaChange}
          multiple
          required
        >
          <option value="Chennai">Chennai</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Madurai">Madurai</option>
          <option value="Trichy">Trichy</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Trivandrum">Trivandrum</option>
          <option value="Kanyakumari">Kanyakumari</option>

        </select>
      </div>


      <div className="form-group">
        <label htmlFor="availabiliity">Available days:</label>
        <select
          className="form-control"
          id="availability"
          value={availability}
          onChange={handleDaysChange}
          multiple
          required
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="sunday">Sunday</option>
         
        </select>
      </div>
      
      <div className="form-group">
  <label htmlFor="working-hours">Working Hours:</label>
  <input
    type="time"
    id="startTime"
    name="startTime"
    value={startTime}
    onChange={(e) => setstartTime(e.target.value)}
    // onChange={handleWorkingHoursChange}
  />
  <span> to </span>
  <input
    type="time"
    id="endTime"
    name="endTime"
    value={endTime}
    onChange={(e) => setendTime(e.target.value)}
    // onChange={handleWorkingHoursChange}
  />
</div>      
       
      {type === 'cleaning' && (
        <>
        <div className='form-group'>
        <label>
          Select Cleaning Type: 
          <select value={cleaningtype} onChange={handlecleaningtype}>
            <option value="">--Select--</option>
            <option value="cleaning"> Normal Cleaning</option>
            <option value="relocation">Deep Cleaning</option>
          </select>
        </label>
       </div>
       <div className='form-group'>
        <label>
          Select area surface covered: 
          <select value={bhk} onChange={handlebhk}>
            <option value="">--Select--</option>
            <option value="cleaning"> 1 BHK</option>
            <option value="relocation"> 2 BHK</option>
          </select>
        </label>
       </div>
        <div className="form-group">
                <label htmlFor="pricing">Price:</label>
                <input
                  type="number"
                  className="form-control"
                  id="pricing"
                  value={pricing}
                  onChange={(event) => setpricing(event.target.value)}
                  required />
              </div>
              <div className="form-group">
                  <label htmlFor="duration">Duration:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(event) => setduration(event.target.value)}
                    required />
                </div></>
      )}

      {type === 'relocation' && (
        <>
          <div className="form-group">
          <label htmlFor="distance">Distance:</label>
          <input
            type="number"
            className="form-control"
            id="distance"
            value={distance}
            onChange={(event) => setdistance(event.target.value)}
            required />
        </div>
         <div className="form-group">
         <label htmlFor="pricing">Price:</label>
         <input
           type="number"
           className="form-control"
           id="pricing"
           value={pricing}
           onChange={(event) => setpricing(event.target.value)}
           required />
       </div>
        <div className="form-group">
        <label htmlFor="duration">Duration:</label>
        <input
          type="number"
          className="form-control"
          id="duration"
          value={duration}
          onChange={(event) => setduration(event.target.value)}
          required />
      </div>
      </>

      )}
        <div className="form-group">
          <label htmlFor="specialRequirements">
            Special Requirements (Tools or Equipment):
          </label>
          <textarea
            id="requirements"
            name="requirements"
            value={requirements}
            onChange={(e) => setrequirements(e.target.value)}
            className="form-control"
            placeholder="Enter any special requirements (if any)"
          />
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary">
            Add Service
          </button>
        </div>
        </div>
        </form>
        </div>
        
        
    
  );
      }

export default AddService;