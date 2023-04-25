import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Alogin() {
       
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [errorMsg, setErrorMsg] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      navigate('/amain');
    } else {
      setErrorMsg('Invalid username or password');
    }
  };

  return (
    <div id='page' className='row mx-3'>
      <div className="col-md-4 border border-1 p-4 mt-5" style={{ backgroundColor: '#fff'}}>
        <form onSubmit={handleLogin}>
        <h1 className='mb-5'>Welcome Admin</h1>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <div className='input-group'>
          <div className='input-group-text'>@</div>
          <input type="text" className='form-control'    onChange={handleUsernameChange} placeholder="Enter username" required/>
          </div>
          <input type="password" placeholder='Enter Password'   onChange={handlePasswordChange}className='form-control mt-3 mb-3' required/>
         
          <button  type='submit' className="btn btn-primary form-control mt-3 mb-4">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Alogin;
