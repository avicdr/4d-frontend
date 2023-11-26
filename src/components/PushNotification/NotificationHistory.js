import moment from 'moment'
import React  from 'react'
import { deleteNotifications, repeatNotifications } from '../../functions/functions.ts'

const NotificationHistory = ({data, setData}) => {

  return (
    <div className="my-5">
      <table className="table table-stripped">
        <thead className="table-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Desription</th>
            <th scope="col">Image</th>
            <th scope="col">OnClick</th>
            <th scope="col">Time </th>
            <th scope="col">Topic</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(notification => (
            <tr key={notification._id}>
              <td>{notification.title}</td>
              <td>{notification.description}</td>
              <td>
                {notification.imageSent === "Yes" &&
                  <div>
                    {
                      <img
                      style={{
                        height: "35px",
                        width: "35px",
                        objectFit: "cover",
                        margin: "0px 5px",
                      }}
                      alt="Img"
                      src={notification.imageUrl}
                    /> || <span>N.A.</span>
                    }
                    <a href={notification.imageUrl} download>
                      <i className="fa fa-download" aria-hidden="true"></i>
                    </a>
                  </div>
                }
              </td>
              <td>{notification.onClick}</td>
              <td>{moment(notification.time).format("DD/MM/YYYY")}</td>
              <td>{notification.topic}</td>
              <td>
                <button className="btn btn-warning" onClick={()=>{repeatNotifications(notification._id)}}>SEND</button>
                 <button className="btn btn-danger mx-3" onClick={()=>{deleteNotifications(notification._id, setData)}}>
                  <img src="https://img.icons8.com/?size=1x&id=104401&format=png" style={{width: "24px"}} alt="delete"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NotificationHistory
