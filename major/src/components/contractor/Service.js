import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Service = () => {
return (
    <div id='page' className='row mx-3'>
      <div className="col-md-4 border border-1 p-4 mt-5 " style={{ backgroundColor: '#fff'}}>
        <form onSubmit={postSignup}>
          <h2>Add Service</h2>
          <input type="text" name='fullname' value={fullname} onChange={(e) => { setfullname(e.target.value) }} placeholder='Enter Name' className='form-control mt-5 mb-4' required />
          <div className='input-group'>
            <input type="text" className='form-control' value={username} onChange={(e) => { setusername(e.target.value) }} placeholder="Enter email" required />
          </div>
          <input type="text" value={phone} onChange={(e) => { setphone(e.target.value) }} placeholder='Enter Phone Number' className='form-control mt-4 mb-4' required />
          <input type="password" name='password' value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder='Enter Password' className='form-control mt-4 ' required />
          <input type="password" name='cpassword' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} placeholder='Confirm Password' className='form-control mt-4 mb-4 ' required />
          <input type="text" name='cname' value={cname} onChange={(e) => { setcname(e.target.value) }} placeholder='Company Name' className='form-control mt-4 mb-4 ' required />
          <input type="text" name='caddress' value={caddress} onChange={(e) => { setcaddress(e.target.value) }} placeholder='Company Address' className='form-control mt-4 mb-4 ' required />
          <input type="text" name='ccontact' value={ccontact} onChange={(e) => { setccontact(e.target.value) }} placeholder='Contact Information' className='form-control mt-4 mb-4 ' required />
          {/* <input type="checkbox" name='servicetype' value={servicetype} onChange={(e)=>{setservicetype(e.target.value)}}  placeholder='Type of service' className='form-control mt-4 mb-4 'required/> */}

          <label htmlFor='servicetype' className='form-control mt-4 mb-4 ' >Service Type: (Please select below the options)</label>
          <div>
            <input type='radio' name='servicetype' value='cleaning services' onChange={(e) => { setservicetype(e.target.value) }} /> Cleaning Services
          </div>
          <div>
            <input type='radio' name='servicetype' value='relocation services' onChange={(e) => { setservicetype(e.target.value) }} /> Relocation Services
          </div>
          <div>
            <input type='radio' name='servicetype' value='both services' onChange={(e) => { setservicetype(e.target.value) }} /> Both Services
          </div>
          <button type='submit' className="btn btn-primary form-control mt-3 mb-3">Register</button>
          <p>Already have account? <Link to="/">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Service;