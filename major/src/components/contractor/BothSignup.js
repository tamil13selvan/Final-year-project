import React from 'react'
import {Link} from 'react-router-dom'

const BothSignup = () => {
  return (
        <div id='page' className='row'>
        <div className="col-md-4 border border-1 p-4 mt-5" style={{ backgroundColor: '#fff'}}>
        <h1 className='mb-5'>SIGNUP</h1>
        <Link to="/clientsignup"><button className="form-control btn btn-warning mb-5">CLIENT SIGNUP</button></Link>
        <Link to="/Providersignup"><button className="form-control btn btn-warning mb-3 ">SERVICE PROVIDER SIGNUP</button></Link>
        <p>Already have account? <Link to="/">Login</Link></p>
        </div>
        </div>
  )  
}

export default BothSignup