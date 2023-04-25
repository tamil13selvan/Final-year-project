import axios from 'axios'
import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import AddService from './AddService'
import Cookies from 'js-cookie';

const Plogin = () => {   
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const postpLogin = async (e) => {
    e.preventDefault();
    try {
    const resp = await axios.post("http://localhost:1234/provider/login",{username,password})
    if (resp.data.status) {
      Cookies.set('username',username);
      // const token = await JsonWebTokenError.sign(username,'secret');
      setIsLoggedIn(true);
    alert("Login Successfully")
     window.location='/ProviderPage'
    }  else {
      alert("Login failed")
    }
    
  } catch (error) {
      alert("Login Failed")
      console.log(error);
    }
  }
  return (
    <div>
      {isLoggedIn ? (
        <AddService username = {username} />
      ):(
    <div id='page' className='row mx-3'>
      <div className="col-md-4 border border-1 p-4 mt-5" style={{ backgroundColor: '#fff'}}>
        <form onSubmit={postpLogin}>
        <h1 className='mb-5'>SERVICE PROVIDER LOGIN</h1>
          <div className='input-group'>
          <div className='input-group-text'>@</div>
          <input type="text" className='form-control' value={username} onChange={(e)=>{setusername(e.target.value)}} placeholder="Enter username" required/>
          </div>
          <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>{setpassword(e.target.value)}} className='form-control mt-3 mb-3' required/>
          {/* <input className="form-check-input me-2" type="checkbox"/>
          <label className='form-check-label me-5'>Remember me</label> */}
          <button disabled={password.length === 0} type='submit' className="btn btn-primary form-control mt-3 mb-4">Log in</button>
          <p>Dont have account? <Link to="/bothsignup">create an account</Link></p>
        </form>
      </div>
    </div>
    )}
    </div>
  )
}

export default Plogin