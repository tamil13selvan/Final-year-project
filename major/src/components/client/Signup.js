import axios from 'axios'
import React,{useState} from 'react'
import {Link} from 'react-router-dom'

const Signup = () => {
  const [fullname, setfullname] = useState("")
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [cpassword, setcpassword] = useState("")
  const [phone, setphone] = useState("")

  const postSignup = async (e) => {
    e.preventDefault()
    try {
    const resp = await axios.post("http://localhost:1234/user/create",{fullname,username,password,cpassword,phone})
    if(password !== cpassword){
      alert("passwords do not match")
    }else{
    console.log(resp)
    window.location='/login'
    alert("Profile Created Successfully")
    }
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div id='page' className='row mx-3'>
      <div className="col-md-4 border border-1 p-4 mt-5 "  style={{ backgroundColor: '#fff'}}>
        <form onSubmit={postSignup}>
        <h2>USER SIGN UP</h2>
          <input type="text" name='fullname' value={fullname} onChange={(e)=>{setfullname(e.target.value)}} placeholder='Enter Name' className='form-control mt-5 mb-4' required/>
          <div className='input-group'>
          <input type="email" className='form-control' value={username} onChange={(e)=>{setusername(e.target.value)}} placeholder="Enter email" required/>
          </div>
          <input type="text" value={phone} onChange={(e)=>{setphone(e.target.value)}} placeholder='Enter Phone Number' className='form-control mt-4 mb-4' required/>
          <input type="password" name='password' value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder='Enter Password' className='form-control mt-4 ' required/>
          <input type="password" name='cpassword' value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}  placeholder='Confirm Password' className='form-control mt-4 mb-4 'required/>
          
          
          <button type='submit' className="btn btn-primary form-control mt-3 mb-3">Register</button>
          <p>Already have account? <Link to="/">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup
