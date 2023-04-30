import moment from "moment";
import React, { useEffect, useState } from "react";
import { base, fetchAds } from "../../../functions/functions.ts";
const Ads = () => {
  const columns = [
    {
      name: "Ad Note",
    },
    {
      name: "App Id",
    },
    {
      name: "Ads Id",
    },
    {
      name: "Action",
    },
  ];

  const [rowCount, setRowCount] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchAds(setData);
  }, []);

  const addRow = () => {
    setRowCount(rowCount + 1);
  };
  const handleSave = (event) => {
    event.preventDefault();
    const row = event.target.parentNode.parentNode;
    const inputs = row.querySelectorAll("input");
    const ad_note = inputs[0].value;
    const app_id = inputs[1].value;
    const ad_id = inputs[2].value;
    const data = { ad_note, app_id, ad_id };

    fetch(`${base}/api/add/create`, {
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
  const handleEdit = (id, adNoteId, appId, adsId) => {
    const ad_note = document.getElementById(adNoteId).value;
    const app_id = document.getElementById(appId).value;
    const ad_id = document.getElementById(adsId).value;
    const data = { ad_note, app_id, ad_id };

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

  const handleDelete = (id)=>{
    fetch(`${base}/api/add/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      fetchAds(setData);
    })
    .catch((error) => {});
  }
  return (
    <div className="container">
      <button className="w-100 btn btn-primary my-2" onClick={addRow}>
        Add New +
      </button>
      <table className="table table-stripped">
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
                  placeholder="Ad Note"
                  className="table-input"
                  id={`adNote-${index}`}
                  defaultValue={item.ad_note}
                  onChange={(e) => {
                    document.getElementById(`adNote-${index}`).value =
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
                  placeholder="App Id"
                  id={`appId-${index}`}
                  defaultValue={item.app_id}
                  onChange={(e) => {
                    document.getElementById(`appId-${index}`).value =
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
                  placeholder="Ads Id"
                  id={`adsId-${index}`}
                  defaultValue={item.ad_id}
                  onChange={(e) => {
                    document.getElementById(`adsId-${index}`).value =
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
                      `adNote-${index}`,
                      `appId-${index}`,
                      `adsId-${index}`
                    )
                  }
                >
                  Save Edit
                </button>
                <button className="btn btn-danger mx-3" onClick={()=>{handleDelete(item._id)}}>
                  <img src="https://img.icons8.com/?size=1x&id=104401&format=png" style={{width: "24px"}}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tbody>
          {[...Array(rowCount)].map((_, index) => (
            <tr key={index}>
              <td style={{ width: "300px" }}>
                <input
                  style={{
                    border: "1px solid grey",
                    width: "100%",
                    padding: "5px",
                    outline: "none",
                  }}
                  placeholder="Ad Note"
                  className="table-input"
                  id={`adNote-${index}`}
                  defaultValue={""}
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
                  placeholder="App Id"
                  id={`appId-${index}`}
                  defaultValue={""}
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
                  placeholder="Ads Id"
                  id={`adsId-${index}`}
                  defaultValue={""}
                />
              </td>
              <td>
                <button className="btn btn-primary" onClick={handleSave} disabled={""}>
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ads;
