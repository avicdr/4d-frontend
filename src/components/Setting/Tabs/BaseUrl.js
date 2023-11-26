import moment from "moment";
import React, { useEffect, useState } from "react";
import { base, fetchAds, fetchBaseUrl } from "../../../functions/functions.ts";
const BaseUrl = () => {
  const columns = [
    {
      name: "Base Url",
    },
    {
      name: "Remark 1",
    },
    {
      name: "Remark 2",
    },
    {
      name: "Action",
    },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchBaseUrl(setData);
  }, []);
  const handleEdit = (id, base_url, remark_1, remark_2) => {
    const baseurl = document.getElementById(base_url).value;
    const remark1 = document.getElementById(remark_1).value;
    const remark2 = document.getElementById(remark_2).value;
    const data = { baseurl, remark1, remark2 };

    fetch(`${base}/api/add/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        fetchAds(setData);
      })
      .catch((error) => {});
  };

  return (
    <div className="container">
      <table className="table table-stripped ">
        <thead className="table-dark">
          <tr>
            {columns.map((item, ind) => {
              return <th scope="col">{item.name} </th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ width: "300px" }}>
                <input
                  style={{
                    border: "1px solid grey",
                    width: "100%",
                    padding: "5px",
                    outline: "none",
                  }}
                  placeholder="Base URL"
                  className="table-input"
                  id={`baseurl-${index}`}
                  defaultValue={item.base_url}
                  onChange={(e) => {
                    document.getElementById(`baseurl-${index}`).value =
                      e.target.value;
                  }}
                />
              </td>
              <td style={{ width: "300px" }}>
                <input
                  className="table-input"
                  style={{
                    border: "1px solid grey",
                    width: "100%",
                    padding: "5px",
                    outline: "none",
                  }}
                  placeholder="Remark 1"
                  id={`remark1-${index}`}
                  defaultValue={item.remark1}
                  onChange={(e) => {
                    document.getElementById(`remark1-${index}`).value =
                      e.target.value;
                  }}
                />
              </td>
              <td>
                <input
                  className="table-input"
                  style={{
                    border: "1px solid grey",
                    width: "100%",
                    padding: "5px",
                    outline: "none",
                  }}
                  placeholder="Remark 2"
                  id={`remark2-${index}`}
                  defaultValue={item.remark2}
                  onChange={(e) => {
                    document.getElementById(`remark2-${index}`).value =
                      e.target.value;
                  }}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleEdit(
                      item._id,
                      `baseurl-${index}`,
                      `remark1-${index}`,
                      `remark2-${index}`
                    )
                  }
                >
                  Save Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaseUrl;
