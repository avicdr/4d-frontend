import React, { useEffect, useState } from "react";
import { getSorting, setSorting } from "../../../functions/functions";

const opts = [
  "Most Downloaded",
  "Less Downloaded",
  "Date Latest",
  "Date Oldest",
  "Free - Paid",
  "Paid - Free",
];
const Sorting = () => {
  const [_4dsort, set4dsort] = useState("");
  const [_4ksort, set4ksort] = useState("");
  const [_livesort, setLivesort] = useState("");
  const getData = async () => {
    let response = await getSorting();
    set4dsort(response[0]._4d);
    set4ksort(response[0]._4k);
    setLivesort(response[0]._live);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      style={{ borderRadius: "10px", padding: 15 }}
      className="container card p-5"
    >
      <div className="row my-3">
        <div className="col-3">
          <h3>Sorting</h3>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-3">
          <p>4D</p>
        </div>
        <div className="col-9">
          <select
            className="form-select  mb-3"
            aria-label="Default select example"
            value={_4dsort}
            onChange={(event) => {
              set4dsort(event.target.value);
            }}
          >
            {opts.map((item, ind) => {
              return (
                <option key={ind} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-3">
          <p>4K</p>
        </div>
        <div className="col-9">
          <select
            className="form-select  mb-3"
            aria-label="Default select example"
            value={_4ksort}
            onChange={(event) => {
              set4ksort(event.target.value);
            }}
          >
            {opts.map((item, ind) => {
              return (
                <option key={ind} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-3">
          <p>Live</p>
        </div>
        <div className="col-9">
          <select
            className="form-select  mb-3"
            aria-label="Default select example"
            value={_livesort}
            onChange={(event) => {
              setLivesort(event.target.value);
            }}
          >
            {opts.map((item, ind) => {
              return (
                <option key={ind} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row d-flex justify-content-end my-3 w-100">
        <button
          className="btn"
          style={{
            padding: "8px 16px",
            background: "linear-gradient(101.43deg, #FBD341 0%, #C59431 100%)",
            borderRadius: "12px",
            color: "white",
            fontWeight: "bold",
            margin: "auto",
            width: "200px",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Sorting;
