import React, { useState, useCallback, useMemo } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { createBanner } from "../../../../functions/functions.ts";

function BannerCreate({ setData }) {
  const [file, setFile] = useState(null);
  const invalidClass = ""
  const [bannerName, setBannerName] = useState("");
  const [visibility, setVisibility] = useState("");
  const [homePageVisibility, setHomePageVisibility] = useState("");
  const onDropMainFile = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    // console.log(acceptedFiles[0]);
  }, []);

  const acceptMainFileExtensions = useMemo(() => {
    const accept = {
      "image/jpeg": [".jpeg"],
    };
    return accept;
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropMainFile,
    maxFiles: 1,
    accept: acceptMainFileExtensions,
  });

  return (
    <>
      <div className="row">
        <div className="w-80 m-auto d-flex flex-column">
          <div className="form-group d-flex flex-column">
            <label>Banner Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setBannerName(e.target.value)}
              className={`form-control ${invalidClass}`}
              placeholder="Enter Banner Name"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "rgb(131,131,131)",
                border: "1px solid rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
          <label style={{ margin: "1rem 0" }}>Visibility</label>
          <select
            style={{
              padding: "0.3rem 0.8rem",
              outline: "none",
              fontSize: "18px",
              borderRadius: "5px",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "rgb(131,131,131)",
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
            defaultValue={"yes"}
            onChange={(e) => { setVisibility(e.target.value) }}
          >
            <option value={"yes"}>Visible</option>
            <option value={"no"}>Hidden</option>
          </select>
          <label style={{ margin: "1rem 0" }}>Home Page Visibility</label>
          <select
            style={{
              padding: "0.3rem 0.8rem",
              outline: "none",
              fontSize: "18px",
              marginBottom: "1rem",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "rgb(131,131,131)",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "5px"
            }}
            defaultValue={"yes"}
            onChange={(e) => { setHomePageVisibility(e.target.value) }}
          >
            <option value={"yes"}>Visible</option>
            <option value={"not"}>Hidden</option>
          </select>
          <Dropzone>
            {() => (
              <div
                {...getRootProps()}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  height: "100px",
                  cursor: "pointer",
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <input {...getInputProps()} />

                <p>
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                  <br />
                  Upload an (File Formate .png, .jpg) file
                </p>
              </div>
            )}
          </Dropzone>
          <div className="form-group">
            <button
              className="btn btn-primary float-right"
              onClick={() => {
                createBanner(bannerName, visibility, homePageVisibility, file, setData);
              }}
            >
              Create Banner
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerCreate;
