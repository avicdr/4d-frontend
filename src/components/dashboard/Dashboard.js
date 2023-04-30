import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
// import { publicFetch } from "../util/fetcher.js";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import axiosInstance, { base } from "../../functions/functions.ts";
import { TailSpin } from "react-loader-spinner";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [paidUser, setPaidUser] = useState(0);
  const [freeUser, setFreeUser] = useState(0);
  const [subscriptionUser, setSubscriptionUser] = useState(0);
  const [coinsGiven, setCoinsGiven] = useState(0);
  const [oneTimePaid, setOneTimePaid] = useState(0);
  const [_4d, set4d] = useState(0);
  const [_4k, set_4k] = useState(0);
  const [live, setLive] = useState(0);
  const [_4dPaid, set4dPaid] = useState(0);
  const [livePaid, setLivePaid] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (_4k === 0 || _4d === 0 || live === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [_4k, _4d, live]);
  const getData = async () => {
    const PaidUserResponse = await axiosInstance.post(`/api/admin/users/paid`);
    setPaidUser(PaidUserResponse.data.paid_total);
    const totalUserResponse = await axiosInstance.post(`/api/admin/users/total`);
    setTotalUsers(totalUserResponse.data.total_user);
    const FreeUserResponse = await axiosInstance.post(`/api/admin/users/free`);
    setFreeUser(FreeUserResponse.data.free_total);
    const _4kWallpaperResponse = await axiosInstance.post(
      `/api/search/total/4K`
    );
    set_4k(_4kWallpaperResponse.data.Wallpaper.length);
    const _4dWallpaperResponse = await axiosInstance.post(
      `/api/search/total/4D`
    );
    set4d(_4dWallpaperResponse.data.Wallpaper.length);
    const liveWallpaperResponse = await axiosInstance.post(
      `/api/search/total/live`
    );
    setLive(liveWallpaperResponse.data.Wallpaper.length);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <h2 className="text-center text-white">DASHBOARD</h2>
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
        </>
      ) : (
        <div className="content-wrapper p-4">
          <div className="row">
            <div className="col-md-12">
              <main className="cont-grey w-80 m-auto rounded">
                <div className="w-80 m-auto cont-grey m-4 px-5 pb-5 pt-3 rounded">

                  {/* <h1 className="mt-4">Dashboard</h1> */}
                  <div
                    className=""
                    style={{
                      outline: "none",
                      padding: "0.4rem 1rem",
                      fontSize: "32px",
                      backgroundColor: "rgb(0 0 0 / 18%)",
                      borderRadius: "4px",
                      width: "100%",
                      color: "rgb(231,231,231)", outline: "none"
                    }}
                  >
                    Dashboard
                  </div>
                  <hr style={{ border: "1px solid grey" }} />
                  <div className="d-flex mb-2 " id="tabContainer">
                    <div className="d-flex flex-wrap gap-2">
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>{totalUsers}</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            Total User
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>2,698</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            One time Paid
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>{_4k}</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            4K
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>{paidUser}</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            Paid User
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>1,268</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            Subscription User
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>1,268</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            xxxx
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>{freeUser}</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            Free User
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>{_4d}</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            4D
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>3,698</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            4D Paid
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>3,698</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            Coins Given
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>{live}</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            Live
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="customCard text-white px-4 py-2">
                          <h1 style={{ marginBottom: "0" }}>1,268</h1>
                          <p
                            className="small"
                            style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              marginBottom: "0",
                            }}
                          >
                            Live paid
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mt-4" style={{ gap: "12.5px" }}>
                    <Link to="/category">
                      <button
                        className="btn"
                        style={{
                          padding: "8px 16px",
                          background:
                            "linear-gradient(101.43deg, #FBD341 0%, #C59431 100%)",
                          borderRadius: "12px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Add Category
                      </button>
                    </Link>
                    <Link to="/tags">
                      <button
                        className="btn"
                        style={{
                          padding: "8px 16px",
                          background:
                            "linear-gradient(101.43deg, #FBD341 0%, #C59431 100%)",
                          borderRadius: "12px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Add Tags
                      </button>
                    </Link>
                    {/* <button
              className="btn"
              style={{
                padding: "8px 16px",
                background:
                  "linear-gradient(101.43deg, #FBD341 0%, #C59431 100%)",
                borderRadius: "12px",
                color: "white",
                fontWeight: "bold"
              }}
            >
              Add Color
            </button> */}
                    <Link to="wallpapers">
                      <button
                        className="btn"
                        style={{
                          padding: "8px 16px",
                          background:
                            "linear-gradient(101.43deg, #FBD341 0%, #C59431 100%)",
                          borderRadius: "12px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Add 4K Wall
                      </button>
                    </Link>
                    <Link to="wallpapers">
                      <button
                        className="btn"
                        style={{
                          padding: "8px 16px",
                          background:
                            "linear-gradient(101.43deg, #FBD341 0%, #C59431 100%)",
                          borderRadius: "12px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Add Live Wall
                      </button>
                    </Link>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
