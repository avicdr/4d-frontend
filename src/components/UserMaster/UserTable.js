import moment from "moment";
import React, { useEffect, useState } from "react";
import { getUserData } from "../../functions/functions.ts";
import { TailSpin } from "react-loader-spinner";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(
    localStorage.getItem("userFilter") || ""
  );
  useEffect(() => {
    getUserData(setData, filter);
  }, [filter]);
  useEffect(() => {
    if (data === []) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let visibleData = data.slice(startIndex, endIndex);
  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const convertTimeZone = (date) => {
    const dateTimeString = date;
    const dateTime = new Date(dateTimeString);

    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Kolkata",
    };

    const formattedDateTime = dateTime.toLocaleString("en-IN", options);
    return formattedDateTime;
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const columns = [
    {
      name: "Device ID",
    },
    {
      name: "Status",
    },
    {
      name: "Brand",
    },
    {
      name: "Paid Amt.",
    },
    {
      name: "Wallpaper Use",
    },
    {
      name: "Android Vr",
    },
    {
      name: "Install Date",
    },
    {
      name: "Last Use",
    },
    {
      name: "Version",
    },
    {
      name: "Coin Balance",
    },
    {
      name: "Coin Used",
    },
    {
      name: "Coins Ads",
    },
    {
      name: "Title",
    },
    {
      name: "Last Amnt",
    },
    {
      name: "Last ($)",
    },
    {
      name: "Push",
    },
  ];

  return (
    <>
      {loading ? (
        <TailSpin
          height="80"
          width="80"
          color="#007bff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass="d-flex flex-column align-items-center justify-content-center"
          visible={loading}
        />
      ) : (
        <>
          <div>
            <div className="d-flex justify-content-between mb-2">
              <h2>User List</h2>
              <select
                defaultValue={""}
                style={{
                  // position: "absolute",
                  right: "2rem",
                  outline: "none",
                  padding: "0.4rem 0.3rem",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "4px",
                  color: "rgb(131,131,131)",
                }}
                onChange={(e) => {
                  setFilter(e.target.value);
                  localStorage.setItem("userFilter", e.target.value);
                }}
              >
                <option value={""}>None</option>
                <option value={"Last Used"}>Last Used</option>
                <option value={"Install Date"}>Install Date</option>
                <option value={"Version"}>Version</option>
                <option value={"Paid Amount"}>Paid Amount</option>
                <option value={"Free"}>Free</option>
                <option value={"Paid"}>Paid</option>
                <option value={"Coins Used"}>Coins Used</option>
                <option value={"Coin Ads"}>Coin Ads</option>
                <option value={"Coin Balance"}>Coin Balance</option>
              </select>
            </div>
            <table className="table">
              <thead className="table-dark">
                <tr>
                  {columns.map((item, ind) => {
                    return (
                      <th key={ind} scope="col">
                        <div
                          style={{
                            width: "max-content",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.name}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {visibleData.map((item, ind) => {
                  return (
                    <tr className="trow">
                      <td>
                        <div
                          style={{
                            width: "120px",
                            textAlign: "center",
                            margin: "auto",
                            position: "relative",
                          }}
                          onMouseEnter={() =>
                            (document.getElementById(
                              `${item.deviceId}`
                            ).style.display = "block")
                          }
                          onMouseLeave={() =>
                            (document.getElementById(
                              `${item.deviceId}`
                            ).style.display = "none")
                          }
                        >
                          {item.deviceId.substring(0, 10) + "..."}

                          <div
                            style={{
                              position: "absolute",
                              top: "-60px",
                              left: "100%",
                              transform: "translateX(-50%)",
                              backgroundColor: "#343a40",
                              border: "1px solid black",
                              padding: "1rem 2rem",
                              paddingLeft: "2rem",
                              display: "none",
                              zIndex: 10,
                            }}
                            id={item.deviceId}
                            onClick={(e) => {
                              navigator.clipboard.writeText(e.target.inn);
                              console.log(
                                document.getElementById(
                                  item.deviceId + "_copied"
                                )
                              );
                              document.getElementById(
                                item.deviceId + "_copied"
                              ).style.visibility = "visible";
                              setTimeout(() => {
                                document.getElementById(
                                  item.deviceId + "_copied"
                                ).style.visibility = "hidden";
                              }, 700);
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                padding: "0.25rem 0.5rem",
                                backgroundColor: "green",
                                color: "white",
                                visibility: "hidden",
                              }}
                              id={item.deviceId + "_copied"}
                            >
                              Copied!
                            </div>
                            {item.deviceId}
                          </div>
                        </div>
                      </td>
                      <td>{item.status}</td>
                      <td>
                        <div
                          style={{
                            width: "120px",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.deviceBrand}
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>{item.amount}</td>
                      <td
                        style={{
                          width: "max-content",
                          textAlign: "center",
                          margin: "auto",
                        }}
                      >
                        Null
                      </td>
                      <td>
                        <div
                          style={{
                            width: "90px",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.androidVersion}
                        </div>
                      </td>
                      <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{convertTimeZone(item.LastLogin)}</td>
                      <td>{item.appVersion || "N.A."}</td>
                      <td>
                        <div
                          style={{
                            width: "max-content",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.coin}
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            width: "max-content",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.addsCoins}
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            width: "max-content",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.usedCoins}
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            width: "max-content",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.amount}
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            width: "max-content",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.coin}
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            width: "max-content",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.coin}
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-secondary">SEND</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="m-2 d-flex justify-content-between">
            <div>
              <button
                className="pagination-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  className={`pagination-btn${
                    currentPage === i + 1 ? " active" : ""
                  }`}
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                  }}
                  disabled={currentPage === i + 1}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="pagination-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <select
                defaultValue={""}
                style={{
                  // position: "absolute",
                  right: "2rem",
                  outline: "none",
                  padding: "0.4rem 0.3rem",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "4px",
                  color: "rgb(131,131,131)",
                }}
                onChange={(e) => {
                  setFilter(e.target.value);
                  localStorage.setItem("userFilter", e.target.value);
                }}
              >
                <option value={""}>None</option>
                <option value={"Last Used"}>Last Used</option>
                <option value={"Install Date"}>Install Date</option>
                <option value={"Version"}>Version</option>
                <option value={"Paid Amount"}>Paid Amount</option>
                <option value={"Free"}>Free</option>
                <option value={"Paid"}>Paid</option>
                <option value={"Coins Used"}>Coins Used</option>
                <option value={"Coin Ads"}>Coin Ads</option>
                <option value={"Coin Balance"}>Coin Balance</option>
              </select>
          </div>
        </>
      )}
    </>
  );
};

export default UserTable;
