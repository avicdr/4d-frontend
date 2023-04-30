import React, { useEffect, useState } from "react";
import {
  createCustomCategory,
  fetchWallpapersWithFilter,
  fetchWallpaperByModel,
} from "../../../../functions/functions.ts";
import { Card } from "react-bootstrap";

function CustomCategoryCreate({ setCustomCategories }) {
  const [categoryName, setCategoryName] = useState("");
  const [wallpaperIds, setWallpaperIds] = useState([]);
  const [wallpapers, setWallpapers] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [data, setData] = useState([]);
  const [model, setModel] = useState("4D");
  useEffect(() => {
    fetchWallpapersWithFilter(
      setWallpapers,
      filter,
      currentPage,
      itemsPerPage,
      model
    );
  }, [currentPage, filter, model]);
  useEffect(() => {
    fetchWallpaperByModel(model, setData);
  }, [model]);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  function addWallpaperId(id) {
    if (wallpaperIds.includes(id)) {
      setWallpaperIds((prevArray) => prevArray.filter((val) => val !== id));
    } else {
      setWallpaperIds((prevArray) => [...prevArray, id]);
    }
  }
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div className="w-100 m-auto m-3 d-flex flex-column">
          <label className="mt-3" style={{ alignSelf: "flex-start" }}>Custom Category Name</label>
          <input placeholder="Enter custom category name"
            className="p-2 rounded"
            type="text"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
            style={{
              padding: "0.4rem 0.3rem",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderRadius: "4px",
              width: "100%",
              color: "rgb(131,131,131)", outline: "none"
            }}
          />
          <label className="mt-3">Wallpaper IDs</label>
          <div>
            {wallpaperIds.map((id) => (
              <span key={id}>{id}, </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", "flex-wrap": "wrap", width: "92%" }}>
          {/* Filter the wallpapers into two arrays */}
          {wallpapers.map((item, ind) => (
            <div className="mx-4 my-2" key={ind} style={{ maxWidth: "18%" }}>
              <div className="col-md-5" key={ind}>
                <Card style={{ width: "183px", margin: 5 }}>
                  <Card.Img
                    variant="top"
                    src={"https://stagingapi.inventurs.in/" + item?.thumbnail}
                    style={{ height: "250px" }}
                  />
                  <Card.Body style={{ padding: 0 }}>
                    <Card.Subtitle className="p-2" style={{padding: "0.4rem 0.3rem",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "4px",
          width: "100%",
          color: "rgb(131,131,131)"}}>
                      Type:{" "}
                      {item.model.charAt(0).toUpperCase() + item.model.slice(1)}
                    </Card.Subtitle>
                    <button
                      className={
                        wallpaperIds.includes(item._id)
                          ? "btn btn-secondary w-100"
                          : "btn btn-primary w-100"
                      }
                      onClick={() => {
                        addWallpaperId(item._id);
                      }}
                    >
                      {wallpaperIds.includes(item._id) ? "-" : "+"}
                    </button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>
        <div className="m-2" style={{ alignSelf: "flex-start" }}>
          <div className="">
            <button
              className="pagination-btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              const showButton =
                page <= 3 ||
                (page > currentPage - 2 && page < currentPage + 2) ||
                page > totalPages - 3;

              if (!showButton) {
                return null;
              }

              return (
                <button
                  className={`pagination-btn${currentPage === page ? " active" : ""
                    }`}
                  key={i}
                  onClick={() => setCurrentPage(page)}
                  disabled={currentPage === page}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <select
              defaultValue={""}
              style={{
                position: "absolute",
                right: "1rem",
                padding: "0.7rem",
                borderRadius: "7px",
                outline: "none",
                border: "none",
              }}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            >
              <option value={"4D"}>4D</option>
              <option value={"4K"}>4K</option>
              <option value={"live"}>Live</option>
            </select>
            <select
              defaultValue={""}
              style={{
                position: "absolute",
                right: "8rem",
                padding: "0.7rem",
                borderRadius: "7px",
                outline: "none",
                border: "none",
              }}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value={""}>None</option>
              <option value={"No Category"}>No Category</option>
              <option value={"No Colors"}>No Colors</option>
              <option value={"No Tags"}>No Tag</option>
              <option value={"No Name"}>No Name</option>
              <option value={"Date Latest"}>Date Latest</option>
              <option value={"Like Up"}>Like Up</option>
              <option value={"Like Down"}>Like Down</option>
              <option value={"Download Up"}>Download Up</option>
              <option value={"Download Down"}>Download Down</option>
              <option value={"Hidden"}>Hidden</option>
              <option value={"Un-Hidden"}>Un-Hidden</option>
              <option value={"Size Up"}>Size Up</option>
              <option value={"Size Down"}>Size Down</option>
              <option value={"Visibility Yes"}>Visibility Yes</option>
              <option value={"Visibility No"}>Visibility No</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-primary m-4 w-100"
          onClick={() => {
            createCustomCategory(categoryName, wallpaperIds, setCustomCategories);
            setWallpaperIds([])
            setCategoryName("")
          }}
          disabled={categoryName === ""}
        >
          Create
        </button>
      </div>
    </>
  );
}

export default CustomCategoryCreate;
