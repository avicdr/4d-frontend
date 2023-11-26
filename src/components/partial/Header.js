import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
  };
  let role = localStorage.getItem("role")
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-black navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <DropdownButton
              id="dropdown-basic-button"
              title={<i className="far fa-user" />}
              variant="dark"
            >
              {role === "admin" && (<Dropdown.Item>
                {" "}
                <NavLink to={"/change-password"}>Change Password</NavLink>
              </Dropdown.Item>)}
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </DropdownButton>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
