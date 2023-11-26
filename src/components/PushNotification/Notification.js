import React, {useEffect, useState} from "react";
import NotificationHistory from "./NotificationHistory";
import SendNotification from "./SendNotification";
import ActivityType from "./ActivityType";
import Topic from "./Topic";
import { getNotifications } from "../../functions/functions.ts";
import { ToastContainer } from "react-toastify";

const Notification = () => {
  const [data, setData] = useState([])
  
  useEffect(()=>{
    getNotifications(setData)
  }, [])
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
                          href="#notificationhistory"
                          data-toggle="tab"
                        >
                          Notification History
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#send_notification"
                          data-toggle="tab"
                        >
                          Send Notification
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="tab-pane active" id="notificationhistory">
                        <NotificationHistory data={data} setData={setData}/>
                      </div>
                      <div className="tab-pane " id="send_notification">
                        <SendNotification setData={setData}/>
                      </div>{" "}
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
