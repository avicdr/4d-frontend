import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { errorPopup } from "../../functions/popupMessages";
import { changePassword } from "../../functions/functions";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    setPasswordError("");
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      errorPopup("Passwords Do Not Match")
      return;
    }
    changePassword(oldPassword, newPassword)
  };

  return (
    <div className="content-wrapper">
      <ToastContainer/>
      <div className="card p-5 my-4 mx-auto w-85">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3>Change Passwordd</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-3" controlId="oldPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter old password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && (
                  <Form.Text className="text-danger">{passwordError}</Form.Text>
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
