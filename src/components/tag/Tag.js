import React, { useEffect, useState } from "react";
import TagCreate from "./tabs/TagCreate";
import TagTable from "./tabs/TagTable";
import { fetchTags } from "../../functions/functions.ts";
import { ToastContainer } from "react-toastify";
function Tag() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetchTags(setTags);
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="w-80 m-auto">
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
                            Tags
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
                          <TagTable tags={tags} setTags={setTags} />
                        </div>
                        <div className="tab-pane " id="tag_create">
                          <TagCreate setTags={setTags} />
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

export default Tag;
