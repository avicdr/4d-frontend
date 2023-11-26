import React from "react";
import UserTable from "./UserTable";
import UpdateDefault from "./UpdateDefault";
import { ToastContainer } from "react-toastify";

const UserMaster = () => {
  return (
    <div className="content-wrapper">
      <ToastContainer/>
      <div className="row">
        <div className="col-md-12">
          <div className="w-85 m-auto">
            <div className="row my-3">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#user"
                          data-toggle="tab"
                        >
                          Manage User
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link "
                          href="#update_default_coins"
                          data-toggle="tab"
                        >
                          Update Default Coins
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div
                        style={{ overflowX: "auto" }}
                        className="tab-pane active"
                        id="user"
                      >
                        <UserTable />
                      </div>
                      <div
                        style={{ overflowX: "auto" }}
                        className="tab-pane "
                        id="update_default_coins"
                      >
                        <UpdateDefault />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMaster;
