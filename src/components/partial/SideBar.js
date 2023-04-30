import React from "react";
import { Link } from "react-router-dom";
function SideBar() {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </Link>

        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Dashboard
                    <span className="right badge badge-danger">New</span>
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user-master" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    User Master
                    <span className="right badge badge-danger">New</span>
                  </p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/tag" className="nav-link">
                  <i className="nav-icon fas fa-tag"></i>
                  <p>Tags</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/category" className="nav-link">
                  <i className="nav-icon fas fa-tag"></i>
                  <p>Category</p>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/wallpapers" className="nav-link">
                  <i className="nav-icon fas fa-tag"></i>
                  <p>Wallpaper</p>
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link to="/push-notification" className="nav-link">
                  <i className="nav-icon fas fa-tag"></i>
                  <p>Push Notification</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/settings" className="nav-link">
                  <i className="nav-icon fas fa-tag"></i>
                  <p>Setting</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
