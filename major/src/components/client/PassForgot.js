import axios from 'axios';
import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PassForgot = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isMailSent, setIsMailSent] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:1234/user/forgotPassword', { email });
          setMessage(response.data.message);
          setEmail("");
          setIsMailSent(true);
        } catch (error) {
          setMessage(error.response.data.message);
        }
      }


    return(
        <><h1>Forgot Password page</h1>
        <div id='page' className='row mx-3'>
            <div className="col-md-4 border border-1 p-4 mt-5"  style={{ backgroundColor: '#fff'}}>

                <Form onSubmit={handleForgotPassword}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted ">
                            <b>we will send you a mail with reset password link</b>
                        </Form.Text>
                        
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                {isMailSent && <h3><b>Mail has been sent successfully, please check the mail and follow the instructions</b></h3>}
            </div>
        </div></>
    )
}

export default PassForgot;