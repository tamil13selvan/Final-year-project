import axios from 'axios'
import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie';
import BookingForm from './BookingForm';

const Clogin = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [error, setError] = useState('')
  const [isCLoggedIn, setIsCLoggedIn] = useState(false);


  const postLogin = async (e) => {
    e.preventDefault()
    try {
    const resp = await axios.post("http://localhost:1234/user/login",{username,password})
    if (resp.data.status) {
     Cookies.set('cusername',username);
     setIsCLoggedIn(true);
    console.log(resp)
    window.location='/login/client'
    alert("Login Successfully")
    }else {
      alert("Login failed");
    }

  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Invalid credentials")
    }else{
      alert("Login Failed")
    }
      console.log(error);
    }
  }
  return (
    <div>
    {isCLoggedIn ? (
      <BookingForm cusername = {username} />
    ):(
    <div id='page' className='row mx-3'  >
      <div className="col-md-4 border border-1 p-4 mt-5"  style={{ backgroundColor: '#fff'}}>
        <form onSubmit={postLogin}>
        <h1 className='mb-5'>CLIENT LOGIN</h1>
          <div className='input-group'>
          <div className='input-group-text'>@</div>
          <input type="text" className='form-control' value={username} onChange={(e)=>{setusername(e.target.value)}} placeholder="Enter email address" required/>
          </div>
          <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>{setpassword(e.target.value)}} className='form-control mt-3 mb-3' required/>
          {/* <input className="form-check-input me-2" type="checkbox"/>
          <label className='form-check-label me-5'>Remember me</label> */}
          <button disabled={password.length === 0} type='submit' className="btn btn-primary form-control mt-3 mb-4">Log in</button>
          <p>Dont have account? <Link to="/bothsignup">create an account</Link></p>
          <a href='/PassForgot'>Forgot password?</a>
        </form>
      </div>
    </div>
     )} 
    </div>
  )
}

export default Clogin