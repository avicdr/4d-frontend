import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import WallpaperContext from "../../../context/WallpaperContext";
import { fetchCategories } from "../../../functions/functions.ts";
import { handleCategoryDelete } from "../../../functions/functions.ts";

function CategoryList({ data, setData }) {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.cat_name,
    },
    {
      name: "Created At",
      selector: (row, index) => {
        var today = new Date(row.createdAt).toLocaleDateString();
        return today;
      },
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={"https://stagingapi.inventurs.in/" + row.thumbnail}
          alt={"Image"}
          width={100}
        />
      ),
    },
    {
      name: "Action",
      selector: (row, index) => {
        // console.log(row);
        return (
          <div className="btn-group">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(row.name, row._id)}
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

  const handleEdit = (date, id) => {
    console.log(date);
  };

  const handleUpdate = (e) => {
    let name = document.getElementById("name").value;
    console.log(name);
    let id = e.target.getAttribute("update-id");
    let payload = { name };
    let url = "category/update/" + id;
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

export default CategoryList;
