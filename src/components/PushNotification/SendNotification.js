import React, { useState, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import Dropzone, { useDropzone } from "react-dropzone";
import { createNotification } from "../../functions/functions.ts";

const SendNotification = () => {
  const [topic, setTopic] = useState("ALL");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageSent, setImageSent] = useState("No");
  const [onClick, setOnClick] = useState("");
  const [mainFile, setMainFile] = useState(null);

  const acceptMainFileExtensions = useMemo(() => {
    const accept = {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    };
    return accept;
  }, []);

  const onDropMainFile = useCallback((acceptedFiles) => {
    setMainFile(acceptedFiles[0]);
    setImageSent("Yes");
    // console.log(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropMainFile,
    maxFiles: 1,
    accept: acceptMainFileExtensions,
  });

  const handleCreate = () => {
    createNotification(title, topic, description, mainFile, imageSent, onClick);
  };

  return (
    <div className="bg-dark p-4">
      <div className="form-group">
        <label className="text-white">Select Topic</label>
        <select
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
          className="form-control bg-dark text-white"
        >
          <option value={"ALL"}>All</option>
          <option value={"FREE"}>Free</option>
          <option value={"PAID"}>Paid</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-white">Notification Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="form-control bg-dark text-white"
          placeholder="Enter description"
        />
      </div>
      <div className="form-group">
        <label className="text-white">Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="form-control bg-dark text-white"
          placeholder="Enter description"
        />
      </div>

      <div className="form-group">
        <label className="text-white">Image</label>
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
                Upload an (File Format .png or .jpg ) file
              </p>
            </div>
          )}
        </Dropzone>
      </div>

      <div className="form-group">
        <label className="text-white">Image Sent?</label>
        <input
          value={imageSent}
          className="form-control bg-dark text-white"
          disabled
        />
      </div>

      <div className="form-group">
        <label className="text-white">On Click</label>
        <input
          type="text"
          className="form-control bg-dark text-white"
          placeholder="Enter onClick"
          onChange={(e) => {
            setOnClick(e.target.value);
          }}
        />
      </div>

      <Button variant="primary" onClick={handleCreate}>
        Send Notification
      </Button>
    </div>
  );
};

export default SendNotification;
