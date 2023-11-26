import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { createUser } from "../../functions/functions";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createUser(name, email, password, role)
    setName("")
    setEmail("")
    setPassword("")
    setRole("")
  };

  return (
    <div className="content-wrapper">
      <ToastContainer/>
      <div className="card p-5 my-4 mx-auto w-85">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3>Create New User</h3>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="input-group" style={{background: "white", border: "1px solid white", borderRadius: "4px"}}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                  style={{background: "none", border:"none"}}
                />
                {/* <Button
                  variant="outline-secondary"
                  
                  className="btn-show-password"
                > */}
                  <img alt="" src={showPassword ? "https://static.thenounproject.com/png/2540385-200.png" : 'https://pixlok.com/wp-content/uploads/2021/10/Eye-Icon-wsj93.png'} style={{width: "40px", paddingRight: "10px", height: "27px", margin: "auto"}} onClick={handleShowPassword}/>
                {/* </Button> */}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="designer">Designer</option>
              </select>
            </div>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
