import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { handleCategoryDelete, base, editTag, deleteTag } from "../../../../functions/functions.ts";
import { ToastContainer } from "react-toastify";

function TagListSettings({ data, setData }) {
  const [wallpaperCounts, setWallpaperCounts] = useState({});

  const fetchWallpaperCount = async (tagId) => {
    try {
      const response = await fetch(
        `${base}/api/tag/wallpaper-count/${tagId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.wallpaper_count_tag;
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
  }, [data]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.tag,
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
      name: "Action",
      selector: (row, index) => {
        return (
          <div className="btn-group">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(row.tag, row._id)}
              data-toggle="modal"
              data-target="#modal-default-tag"
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                deleteTag(row._id, setData);
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
    document.getElementById("nameTag").value = name;
    document.getElementById("nameTag").setAttribute("update-id", id);
  };

  const handleUpdate = () => {
    let name = document.getElementById("nameTag").value;
    console.log(name);
    let id = document.getElementById("nameTag").getAttribute("update-id");
    editTag(name, id, setData)
  };

  return (
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
        id="modal-default-tag"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Tag</h4>
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
              <label>Tag Name</label>
              <input
                type="text"
                id="nameTag"
                name="name"
                className="form-control"
                placeholder="Enter Tag Name"
              />
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
  );
}

export default TagListSettings;
