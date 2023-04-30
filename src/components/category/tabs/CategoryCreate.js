import React, {
  useState,
  useCallback,
  useMemo,
} from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { createCategory } from "../../../functions/functions.ts";

function CategoryCreate({ setData }) {
  const [file, setFile] = useState(null);
  const [Category, setCategory] = useState("");
  const [invalidClass, setInvalidClass] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const onDropMainFile = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    // console.log(acceptedFiles[0]);
  }, []);

  const acceptMainFileExtensions = useMemo(() => {
    const accept = {
      "image/jpeg": [".jpeg"],
    };
    return accept
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropMainFile,
    maxFiles: 1,
    accept: acceptMainFileExtensions,
  });

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              className={`form-control ${invalidClass}`}
              placeholder="Enter Category Name"
            />
          </div>
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
                createCategory(Category, file, setData);
                document.getElementById("name").value = "";
              }}
            >
              Save Category
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCreate;
