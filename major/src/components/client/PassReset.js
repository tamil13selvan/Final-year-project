import axios from 'axios';
import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PassReset = (props) => {
     
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }
  
      try {
        const response = await axios.post(`/reset-password/${props.token}`, {
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        });
        alert(response.data.message);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    };

    return(
      <div id='page' className='row mx-3'>
      <div className="col-md-4 border border-1 p-4 mt-5"  style={{ backgroundColor: '#fff'}}>
         
         {/* <Form onSubmit={handleSubmit}> */}
         <Form onSubmit={handleSubmit} action={`/reset-password/${props.token}`}>
        <Form.Group className="mb-3" controlId="newpassword" value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}>
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="Enter new password" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="confirmPassword" value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form> 
      </div>
      </div>
    );

    }      

export default PassReset