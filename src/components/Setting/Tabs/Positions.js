import React, { useEffect, useState } from "react";
import axiosInstance, { base } from "../../../functions/functions.ts";
import { ToastContainer } from "react-toastify";
import { successPopup } from "../../../functions/popupMessages.js";

function Positions() {
  // const [tagPosition, setTagPosition] = useState("0");
  // const [colorPosition, setColorPosition] = useState("0");
  const [trendingPosition, setTrendingPosition] = useState("0");
  const [trendingVisibility, setTrendingVisibility] = useState(false);
  const [newAddedPosition, setNewAddedPosition] = useState("0");
  const [newAddedVisibility, setNewAddedVisibility] = useState(false);
  const [customPosition, setCustomPosition] = useState("0");
  const [customVisibility, setCustomVisibility] = useState(false);
  const fetchData = async () => {
    const response = await axiosInstance.post(`/api/home/status`);
    const data = response.data.status;
    // setTagPosition(Number(data.tag));
    // setColorPosition(Number(data.color));
    setTrendingPosition(Number(data.trending));
    setTrendingVisibility(Number(data.trendingVisibility));
    setNewAddedPosition(Number(data.newAddedd));
    setNewAddedVisibility(Number(data.newlyAddedVisibility));
    setCustomPosition(Number(data.custome));
    setCustomVisibility(Number(data.customVisibility));
  };
  const handlePositionChange = async () => {
    await axiosInstance.post(`/api/home/sort`, {
      // color: colorPosition,
      // tags: tagPosition,
      trending: trendingPosition,
      newlyAdded: newAddedPosition,
      custom: customPosition,
      trendingVisibility: trendingVisibility,
      newlyAddedVisibility: newAddedVisibility,
      customVisibility: customVisibility,
    });
    successPopup("Settings updated successfully")
  };
  useEffect(() => {
    fetchData();
  }, []);

  const styles = {
    padding: "0.8rem 0.8rem",
    borderRadius: "5px",
    fontSize: "18px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    width: "100%",
    color: "rgb(131,131,131)",
  };
  return (
    <>
    <ToastContainer/>
      <div className="d-flex flex-column">
        <h3>Change Positions</h3>
        <div className="d-flex flex-column m-2">
          <label style={{ "font-size": "22px" }}>Trending</label>
          <span>
            Visibility:{" "}
            <input
              type="checkbox"
              id="mycheck"
              checked={trendingVisibility}
              onChange={(event) => setTrendingVisibility(event.target.checked)}
            ></input>
          </span>
          <select
            style={styles}
            value={trendingPosition}
            onChange={(e) => {
              if (Number(e.target.value) === newAddedPosition) {
                setNewAddedPosition(trendingPosition);
                setTrendingPosition(Number(e.target.value));
              } else if (Number(e.target.value) === customPosition) {
                setCustomPosition(trendingPosition);
                setTrendingPosition(Number(e.target.value));
              }
            }}
          >
            <option value={"0"}>1</option>
            <option value={"1"}>2</option>
            <option value={"2"}>3</option>
          </select>
        </div>
        <div className="d-flex flex-column m-2">
          <label style={{ "font-size": "22px" }}>New Added </label>
          <span>
            Visibility:{" "}
            <input
              type="checkbox"
              id="mycheck"
              checked={newAddedVisibility}
              onChange={(event) => setNewAddedVisibility(event.target.checked)}
            ></input>
          </span>
          <select
            style={styles}
            value={newAddedPosition}
            onChange={(e) => {
              if (Number(e.target.value) === trendingPosition) {
                setTrendingPosition(newAddedPosition);
                setNewAddedPosition(Number(e.target.value));
              } else if (Number(e.target.value) === customPosition) {
                setCustomPosition(newAddedPosition);
                setNewAddedPosition(Number(e.target.value));
              }
            }}
          >
            <option value={"0"}>1</option>
            <option value={"1"}>2</option>
            <option value={"2"}>3</option>
          </select>
        </div>
        <div className="d-flex flex-column m-2">
          <label style={{ "font-size": "22px" }}>Custom Category</label>
          <span>
            Visibility:{" "}
            <input
              type="checkbox"
              id="mycheck"
              checked={customVisibility}
              onChange={(event) => setCustomVisibility(event.target.checked)}
            ></input>
          </span>
          <select
            style={styles}
            value={customPosition}
            onChange={(e) => {
              if (Number(e.target.value) === trendingPosition) {
                setTrendingPosition(customPosition);
                setCustomPosition(Number(e.target.value));
              } else if (Number(e.target.value) === newAddedPosition) {
                setNewAddedPosition(customPosition);
                setCustomPosition(Number(e.target.value));
              }
            }}
          >
            <option value={"0"}>1</option>
            <option value={"1"}>2</option>
            <option value={"2"}>3</option>
          </select>
        </div>
        <button className="btn btn-primary m-4" onClick={handlePositionChange}>
          Save
        </button>
      </div>
    </>
  );
}

export default Positions;
