import React, { useContext, useEffect, useState } from "react";
import CategoryCreate from "./tabs/CategoryCreate";
import CategoryList from "./tabs/CategoryList";
import { ToastContainer } from "react-toastify";
import { fetchCategories } from "../../functions/functions.ts";

function Category() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchCategories(setData);
  }, []);
  return (
    <>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="w-80 m-auto">
              <ToastContainer />
              <div className="row my-3">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header p-2">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#tags"
                            data-toggle="tab"
                          >
                            Category
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#tag_create"
                            data-toggle="tab"
                          >
                            Create
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div className="tab-pane active" id="tags">
                          <CategoryList data={data} setData={setData} />
                        </div>

                        <div className="tab-pane " id="tag_create">
                          <CategoryCreate setData={setData} />
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
    </>
  );
}

export default Category;
