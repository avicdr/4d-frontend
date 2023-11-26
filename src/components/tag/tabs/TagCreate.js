import React, { useState } from "react";
import { createTag } from "../../../functions/functions.ts";

function TagCreate({ setTags }) {
  const [tag, setTag] = useState("");
  const [invalidClass, setInvalidClass] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    if (tag === "") {
      setInvalidClass("is-invalid");
      return;
    }
    let name = tag;
    createTag(name, setTags);
  };

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>Tag Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              className={`form-control ${invalidClass}`}
              placeholder="Enter Tag Name"
              style={{
                background: "none",
                border: "1px solid rgba(131, 131,131,0.2)",
                color: "white"
              }}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary float-right"
              onClick={handelSubmit}
            >
              Save Tag
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TagCreate;
