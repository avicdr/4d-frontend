import React from "react";
import NotificationHistory from "./NotificationHistory";
import SendNotification from "./SendNotification";
import ActivityType from "./ActivityType";
import Topic from "./Topic";

const Notification = () => {
  console.log("run")
  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12">
          <div className="container">
            <div className="row my-3">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#notificationhistory"
                          data-toggle="tab"
                        >
                          Notification History
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#send_noti"
                          data-toggle="tab"
                        >
                          Send Notification
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#noti_type"
                          data-toggle="tab"
                        >
                          Acivity Type
                        </a>
                      </li>{" "}
                      <li className="nav-item">
                        <a className="nav-link" href="#topic" data-toggle="tab">
                          Topic
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="tab-pane active" id="notificationhistory">
                        <NotificationHistory />
                      </div>
                      <div className="tab-pane " id="send_noti">
                        <SendNotification />
                      </div>{" "}
                      <div className="tab-pane " id="noti_type">
                        <ActivityType />
                      </div>{" "}
                      <div className="tab-pane " id="topic">
                        <Topic />
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

export default Notification;
