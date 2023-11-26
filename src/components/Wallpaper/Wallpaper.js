import React from "react";
import WallpaperList from "./WallpaperList";
import WallpaperCreate from "./WallpaperCreate";
import { ToastContainer } from "react-toastify";

function Wallpaper() {
  return (
    <div className="content-wrapper">
      <ToastContainer/>
      <div className="row">
        <div className="col-md-12">
          <div>
            <div className="w-85 m-auto">
              <div className="row my-3">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header p-2">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#wallpapers"
                            data-toggle="tab"
                          >
                            Wallpaper
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#wallpaper-create"
                            data-toggle="tab"
                          >
                            Create
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div className="tab-pane active" id="wallpapers">
                          <WallpaperList />
                        </div>

                        <div className="tab-pane " id="wallpaper-create">
                          <WallpaperCreate />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallpaper;
