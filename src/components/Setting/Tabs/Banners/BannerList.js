import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { base, fetchBanners } from "../../../../functions/functions.ts";
import axios from "axios";


function BannerList({ data, setData }) {
  const updateWallpaper = async (id, value, query) =>{
    
    try {
      const form = new FormData();
      form.append(query, value);
      await axios({
        method: "POST",
        url: `${base}/api/banner/update/${id}`,
        data: form,
        headers: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      fetchBanners(setData)
    } catch (err) {
      // console.log(err);
    }
  }
  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <img
          src={"https://stagingapi.inventurs.in/" + row.bannerLocation}
          alt={"Image"}
          width={100}
        />
      ),
    },
    {
      name: "Banner Name",
      selector: (row) => row.bannerName,
    },
    {
      name: "Time",
      selector: (row) => {
        var today = new Date(row.createdAt).toLocaleDateString();
        return today;
      },
    },
    {
      name: "Visibility",
      selector: (row) => row.visibility,
      cell: (row) => {
        const options = [
          { value: "yes", label: "Visible" },
          { value: "no", label: "Hide" },
        ];
        const defaultValue = row.visibility === "no" ? "no" : "yes";

        return (
          <select defaultValue={defaultValue} style={{"background": "none", "padding": "0.3rem 0.8rem", "border": "none", "color": "white", "outline": "none"}} onChange={(event)=>{
            updateWallpaper(row._id, event.target.value, "visibility")
          }}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      },
    },    
    {
      name: "Clicks",
      selector: (row) => row.clicks,
    },
    {
      name: "Home",
      selector: (row) => row.home_page_visibility,
      cell: (row) => {
        const checked = row.home_page_visibility !== "not";
        return <input type="checkbox" checked={checked} onChange={()=>{updateWallpaper(row._id, checked ? "not" : "yes", "home_page_visibility" )}}/>;
      },
    }
  ];

  const handleUpdate = (e) => {
    let name = document.getElementById("name").value;
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

export default BannerList;
