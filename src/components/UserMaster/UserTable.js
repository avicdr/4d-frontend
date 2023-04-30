import moment from "moment";
import React, { useEffect, useState } from "react";
import { getUserData } from "../../functions/functions.ts";
import { TailSpin } from "react-loader-spinner";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserData(setData);
  }, []);
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
      name: "Device Id",
    },
    {
      name: "Status",
    },
    {
      name: "Brand",
    },
    {
      name: "Paid Amount",
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
      name: "Last Try Amount",
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
        <div>
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
                        }}
                      >
                        {item.deviceId}
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
                    <td>Null</td>
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
          <div className="m-2">
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
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
