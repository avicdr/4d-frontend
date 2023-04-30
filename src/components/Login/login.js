import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { authenticateUser } from '../../functions/functions.ts';

const LoginPage = () => {
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")
    const handleSubmit = ()=>{
        authenticateUser(mail, pass)
    }
  return (
    <div className="bg-dark vh-100 d-flex align-items-center justify-content-center">
      <div className="container col-lg-4 col-md-6 col-sm-8">
        <div className="bg-light rounded-lg p-4">
          <h3 className="text-center mb-4">Login</h3>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=>{setMail(e.target.value)}}/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" onChange={(e)=>{setPass(e.target.value)}}/>
          </div>

          <Button variant="primary" className="w-100 mt-3" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;