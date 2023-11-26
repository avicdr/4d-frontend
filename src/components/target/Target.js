import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axiosInstance, { setMonthlyCount } from "../../functions/functions";

function Target() {
  // check if user is an admin
  const isAdmin = localStorage.getItem("role") === "admin";
  const [data, setData] = useState([]);
  let email = localStorage.getItem("email");

  const [target, setTarget] = useState({
    fourD: 0,
    fourK: 0,
    live: 0,
  });

  // state for uploaded data
  const [uploaded, setUploaded] = useState({
    _4K: 0,
    _4D: 0,
    _live: 0,
  });

  let getData = async () => {
    const resp = await axiosInstance.post("/api/designer/getAll");
    setData(resp.data.data);
  };

  let getTarget = async () => {
    const resp = await axiosInstance.post("/api/designer/getTarget");
    setTarget({
      fourK: resp.data._4k,
      fourD: resp.data._4d,
      live: resp.data._live,
    });
  };

  let getDesignerData = async (value) => {
    const response = await axiosInstance.post(
      `/api/designer/getMonthlyUploads/${value}`
    );
    setUploaded({
      _4K: response.data.result[0]._4d,
      _4D: response.data.result[0]._4k,
      _live: response.data.result[0]._live,
    });
  };

  let handleSelectChange = (designer) => {
    getDesignerData(designer);
  };

  useEffect(() => {
    getData();
    getTarget();
  }, []);

  // handle input changes
  const handleInputChange = (e) => {
    setTarget({
      ...target,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setMonthlyCount(target.fourD, target.fourK, target.live);
  };

  const options = data.map((user) => ({
    label: user.name,
    value: user.email,
  }));

  useEffect(() => {
    if (email && localStorage.getItem("role") !== "admin") {
      getDesignerData(email);
    }
  }, [email]);

  return (
    <div className="content-wrapper">
      <ToastContainer />
      <div className="card p-5 my-4 mx-auto w-85">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1>Month's Target</h1>
            {isAdmin ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fourD">4D</label>
                  <input
                    type="number"
                    className="form-control"
                    id="fourD"
                    name="fourD"
                    value={target.fourD}
                    onChange={handleInputChange}
                    placeholder="Enter target for 4D"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fourK">4K</label>
                  <input
                    type="number"
                    className="form-control"
                    id="fourK"
                    name="fourK"
                    value={target.fourK}
                    onChange={handleInputChange}
                    placeholder="Enter target for 4K"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="live">Live</label>
                  <input
                    type="number"
                    className="form-control"
                    id="live"
                    name="live"
                    value={target.live}
                    onChange={handleInputChange}
                    placeholder="Enter target for Live"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="monthlyTarget">Monthly Target</label>
                  &nbsp;{" "}
                  <span>
                    {(target.fourD ? parseInt(target.fourD) : 0) +
                      (target.fourK ? parseInt(target.fourK) : 0) +
                      (target.live ? parseInt(target.live) : 0) || 0}
                  </span>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            ) : (
              <div>
                <div style={{ fontSize: "22px" }}>
                  <strong>4D:</strong> {target.fourD}
                </div>
                <div style={{ fontSize: "22px" }}>
                  <strong>4K:</strong> {target.fourK}
                </div>
                <div style={{ fontSize: "22px" }}>
                  <strong>Live:</strong> {target.live}
                </div>
                <div style={{ fontSize: "22px" }}>
                  <strong>Monthly Target:</strong>{" "}
                  {parseInt(target.fourD) +
                    parseInt(target.fourK) +
                    parseInt(target.live)}
                </div>
              </div>
            )}
            <hr />
            <div className="d-flex justify-content-between">
              <h1>Uploaded Data</h1>
              {isAdmin && (
                <select
                  defaultValue={""}
                  className="form-select"
                  style={{ width: "300px", height: "50px" }}
                  onChange={(e) => {
                    handleSelectChange(e.target.value);
                  }}
                >
                  <option value="">Select Designer</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div style={{ fontSize: "22px" }}>
              <strong>Monthly:</strong>{" "}
              {parseInt(uploaded._4K) +
                parseInt(uploaded._4D) +
                parseInt(uploaded._live)}
              <div>
                <div style={{ fontSize: "18px" }}>
                  <strong>4D:</strong> {uploaded._4D}
                </div>
                <div style={{ fontSize: "18px" }}>
                  <strong>4K:</strong> {uploaded._4K}
                </div>
                <div style={{ fontSize: "18px" }}>
                  <strong>Live:</strong> {uploaded._live}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Target;
