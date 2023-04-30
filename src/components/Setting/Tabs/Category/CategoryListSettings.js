import React, { useCallback, useMemo, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Dropzone, { useDropzone } from "react-dropzone";
import {
  handleCategoryDelete,
  base,
  editCategory,
} from "../../../../functions/functions.ts";
import { TailSpin } from "react-loader-spinner";

function CategoryList({ data, setData }) {
  const [wallpaperCounts, setWallpaperCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchWallpaperCount = async (categoryId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${base}/api/category/wallpaper-count/${categoryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.wallpaper_count_category;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    data.forEach((row) => {
      fetchWallpaperCount(row._id).then((wallpaperCounts) => {
        setWallpaperCounts((prevCounts) => ({
          ...prevCounts,
          [row._id]: wallpaperCounts,
        }));
      });
    });
    setLoading(false);
  }, [data]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.cat_name,
    },
    {
      name: "4D",
      selector: (row) => (
        <>
          {row.d4}{" "}
          {wallpaperCounts[row._id] && wallpaperCounts[row._id].wallpaper_4d}
        </>
      ),
    },
    {
      name: "4K",
      selector: (row) => (
        <>
          {row.k4}{" "}
          {wallpaperCounts[row._id] && wallpaperCounts[row._id].wallpaper_4k}
        </>
      ),
    },
    {
      name: "Live",
      selector: (row) => (
        <>
          {row.live}{" "}
          {wallpaperCounts[row._id] && wallpaperCounts[row._id].wallpaper_live}
        </>
      ),
    },
    {
      name: "Created At",
      selector: (row) => {
        var today = new Date(row.createdAt).toLocaleDateString();
        return today;
      },
    },
    {
      name: "Hits",
      selector: (row) => row.hits || 0,
    },
    {
      name: "Image",
      cell: (row) => {
        return (
          <img
            src={"https://stagingapi.inventurs.in/" + row.thumbnail}
            alt={"Image"}
            style={{ width: "50px", borderRadius: "30px" }}
            width={100}
          />
        );
      },
    },
    {
      name: "Action",
      selector: (row, index) => {
        return (
          <div className="btn-group">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(row.cat_name, row._id)}
              data-toggle="modal"
              data-target="#modal-default"
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                handleCategoryDelete(row._id, setData);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const handleEdit = (name, id) => {
    document.getElementById("name").value = name;
    document.getElementById("name").setAttribute("update-id", id);
  };

  const handleUpdate = (e) => {
    let name = document.getElementById("name").value;
    console.log(name);
    let id = document.getElementById("name").getAttribute("update-id");
    editCategory(id, name, file, setData);
  };
  const [file, setFile] = useState(null);
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
            <DataTable
              theme="dark"
              columns={columns}
              data={data}
              pagination
              // selectableRows
              fixedHeader
              fixedHeaderScrollHeight="60vh"
              // selectableRowsHighlight
              highlightOnHover
            />
          </div>

          <div
            className="modal fade show"
            id="modal-default"
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Category</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <label>Category Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Category Name"
                  />
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
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    id="update"
                    onClick={handleUpdate}
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CategoryList;
