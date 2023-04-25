import React from 'react'
import {Link} from 'react-router-dom'
function MainPage() {
  return (
    <div id='page' className='row container' style={{display:'c'}}>
      <img src="" alt="" />
        <div className='col-md-6 container'>
            <h1 className='mb-5'></h1>
            <h1 className='display-5'>PACKING AND CLEANING FOR YOU</h1>
            <h5></h5>
        </div>
        <div className="container col-md-4 border border-1 p-4 mt-5 mx-5">
        <form >
        <h1 className='mb-5' style={{textAlign:'center'}}>LOGIN </h1>
        <Link to="/login"><button className="form-control btn btn-warning mb-5">Client Login</button></Link>
        <Link to="/ProviderLogin"><button className="form-control btn btn-warning mb-3 ">Service provider Login</button></Link>
        <p>Dont have account? <Link to="/bothsignup" className='text-white'>create an account</Link></p>
        </form>
        {/* <Link to="/" */}
      </div>

          </div>
  )
}
export default MainPage;
         
  
          


            
