import moment from 'moment'
import React from 'react'

const Topic = () => {
  return (
    <table className="table table-stripped">
    <thead className="table-dark">
      <tr >
        <th scope="col">Topic </th>
        <th scope="col">Time </th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ width: "500px" }}>
          <input
            style={{
              border: "1px solid black",
              width: "100%",
              padding: "5px",
              
            }}
            placeholder="in app page"
          />
        </td>{" "}
        <td>
            {moment().format('DD/MM/YYYY')}
        </td>
        <td>
          <button className="btn btn-warning">SEND</button>
        </td>
      </tr>
    </tbody>
  </table>
  )
}

export default Topic