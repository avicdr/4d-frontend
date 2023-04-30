import React from "react";
import TagTable from "../tag/tabs/TagTable";
import UserTable from "./UserTable";

const UserMaster = () => {
  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12">
          <div className="w-80 m-auto">
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
