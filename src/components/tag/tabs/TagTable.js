import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { editTag, deleteTag } from "../../../functions/functions.ts";

function TagTable({tags, setTags}) {

  const columns = [
    {
      name: "Name",
      selector: (row) => row.tag || row.name,
    },
    {
      name: "Created At",
      selector: (row, index) => {
        var today = new Date(row.createdAt).toLocaleString();
        return today;
      },
    },
    {
      name: "Action",
      selector: (row, index) => {
        // console.log(row);
        return (
          <div className="btn-group">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(row._id)}
              data-toggle="modal"
              data-target="#modal-default"
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(row._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    deleteTag(id, setTags);
  };
  const handleEdit = (name, id) => {
    console.log(name);
    document.getElementById("name").value = name;
    document.getElementById("update").setAttribute("update-id", id);
  };
  const handleUpdate = (e) => {
    let name = document.getElementById("name").value;
    console.log(name);
    let id = e.target.getAttribute("update-id");
    editTag(id, name)
  };
  const [newTagName, setNewTagName] = useState("")
  return (
    <>
      <div>
        <DataTable
          theme="dark"
          columns={columns}
          data={tags}
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
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter Tag Name"
                onChange={(event)=>setNewTagName(event.target.value)}
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

export default TagTable;
