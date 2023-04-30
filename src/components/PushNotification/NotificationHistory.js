import moment from 'moment'
import React from 'react'

const NotificationHistory = () => {
  return (
    <div className="container my-5">
    <table className="table table-stripped">
      <thead className="table-dark">
        <tr >
          <th scope="col">Title</th>
          <th scope="col">Desription</th>
          <th scope="col">Image</th>
          <th scope="col">Activity / Type</th>
          <th scope="col">Time </th>
          <th scope="col">Topic</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>50% off</td>
          <td>50% off</td>

          <td>
            {" "}
            <div>
              <img
                style={{
                  height: "35px",
                  width: "35px",
                  objectFit: "cover",
                  margin: "0px 5px",
                }}
                src="https://mobimg.b-cdn.net/v3/fetch/05/05eeb93a2e41734ecb6044146351f11e.jpeg"
              />
              <a download>
                <i className="fa fa-download " aria-hidden="true"></i>
              </a>
            </div>
          </td>
          <td>In app Page</td>
          <td>{moment().format("DD/MM/YYYY")}</td>
          <td>Unpaid Users</td>
          <td>
            <button className="btn btn-warning">SEND</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default NotificationHistory