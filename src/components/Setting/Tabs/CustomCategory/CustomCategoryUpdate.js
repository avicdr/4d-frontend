import React, { useEffect, useState } from "react";
import axiosInstance, {
  updateCustomCategory,
  fetchWallpapersWithFilter,
  fetchWallpaperByModel,
} from "../../../../functions/functions.ts";
import { Card } from "react-bootstrap";

function CustomCategoryUpdate({ data }) {
  const [wallpaperIds, setWallpaperIds] = useState([]);
  const [totalWallpapers, setTotalWallpapers] = useState([]);
  const [categoryID, setCategoryID] = useState("");
  const [wallpapers, setWallpapers] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newPageNumber, setNewPageNumber] = useState(1);
  const itemsPerPage = 20;
  const [model, setModel] = useState("4D");
  const [visibility, setVisibility] = useState(false);
  const getWallpaperIDs = async () => {
    const response = await axiosInstance.post(
      `/api/home/custom_category/${categoryID}`
    );
    setWallpaperIds(response.data.data.wallpaper_id);
    setVisibility(response.data.data.visibility);
  };

  useEffect(() => {
    if (categoryID.length > 0) {
      getWallpaperIDs();
    } else {
      setWallpaperIds([]);
    }
  }, []);

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
    fetchWallpaperByModel(model, setTotalWallpapers);
  }, [model]);
  const totalPages = Math.ceil(totalWallpapers.length / itemsPerPage);

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
        <label className="mt-3 mb-3" style={{ alignSelf: "flex-start" }}>
          Category
        </label>
        <select
          className="form-select"
          onChange={(e) => {
            setCategoryID(e.target.value);
          }}
          style={{
            padding: "0.4rem 0.3rem",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderRadius: "4px",
            width: "100%",
            color: "rgb(131,131,131)",
            outline: "none",
          }}
        >
          <option value="">Select Category</option>
          {data.map((customCategory) => (
            <option key={customCategory._id} value={customCategory._id}>
              {customCategory.custom_cat_name}
            </option>
          ))}
        </select>
        <div class="form-check m-2" style={{ alignSelf: "flex-start" }}>
          <input
            class="form-check-input"
            type="checkbox"
            checked={visibility}
            onChange={(e) => {
              setVisibility(e.target.checked);
            }}
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Visibility
          </label>
        </div>
        <div
          className="d-flex justify-content-between w-100"
          style={{ alignItems: "baseline" }}
        >
          <label className="w-100 mt-3">Wallpaper IDs</label>
          <div
            className="d-flex w-100 mt-2"
            style={{ justifyContent: "flex-end" }}
          >
            <select
              defaultValue={""}
              style={{
                padding: "0.7rem 0.3rem",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "rgb(131,131,131)",
                borderRadius: "7px",
                outline: "none",
              }}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            >
              <option value={"4D"}>4D</option>
              <option value={"4K"}>4K</option>
              <option value={"live"}>Live</option>
              <option value={"all"}>All</option>
            </select>
            <select
              defaultValue={""}
              style={{
                // position: "absolute",
                marginLeft: "2rem",
                padding: "0.7rem 0.3rem",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "rgb(131,131,131)",
                borderRadius: "7px",
                outline: "none",
              }}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value="">No Filters</option>
              <option value={"With Primary"}>With Primary</option>
              <option value={"No Primary"}>No Primary</option>
              <option value={"No Category"}>No Category</option>
              <option value={"No Colors"}>No Colors</option>
              <option value={"No Tags"}>No Tag</option>
              <option value={"Date Oldest"}>Date Oldest</option>
              <option value={"Date Latest"}>Date Latest</option>
              <option value={"Like Up"}>Like Up</option>
              <option value={"Like Down"}>Like Down</option>
              <option value={"Download Up"}>Download Up</option>
              <option value={"Download Down"}>Download Down</option>
              <option value={"Hide"}>Hidden</option>
              <option value={"Size Up"}>Size Up</option>
              <option value={"Size Down"}>Size Down</option>
            </select>
          </div>
        </div>
        <div>
          {wallpaperIds.map((id) => (
            <span key={id}>{id}, </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            "flex-wrap": "wrap",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* Filter the wallpapers into two arrays */}
          {wallpapers.map((item, ind) => (
            <div className="mx-4 my-2" key={ind} style={{ maxWidth: "18%" }}>
              <div className="col-md-5" key={ind}>
                <Card style={{ width: "185px", margin: 4 }}>
                  <Card.Img
                    variant="top"
                    src={"http://localhost:4000/" + item?.thumbnail}
                    style={{ height: "250px" }}
                  />
                  <Card.Body style={{ padding: 0 }}>
                    <Card.Subtitle className="p-2">
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
                  className={`pagination-btn${
                    currentPage === page ? " active" : ""
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
            <input
              type="text"
              placeholder="Page.."
              value={newPageNumber}
              style={{
                background: "none",
                border: "1px solid rgba(0,0,0,0.2)",
                width: "4rem",
                padding: "0.3rem",
                marginLeft: "4rem",
                borderRadius: "6px",
                color: "rgb(131,131,131)",
              }}
              onChange={(e) => {
                setNewPageNumber(Number(e.target.value));
              }}
            />
            <button
              className="pagination-btn active"
              onClick={() => {
                if (newPageNumber > totalPages || newPageNumber === 0) {
                  alert("No page exists");
                  setNewPageNumber(currentPage);
                } else {
                  setCurrentPage(newPageNumber);
                }
              }}
            >
              Go
            </button>
            <select
              defaultValue={""}
              style={{
                position: "absolute",
                right: "14rem",
                padding: "0.7rem 0.3rem",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "rgb(131,131,131)",
                borderRadius: "7px",
                outline: "none",
              }}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            >
              <option value={"4D"}>4D</option>
              <option value={"4K"}>4K</option>
              <option value={"live"}>Live</option>
              <option value={"all"}>All</option>
            </select>
            <select
              defaultValue={""}
              style={{
                position: "absolute",
                right: "2rem",
                padding: "0.7rem 0.3rem",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "rgb(131,131,131)",
                borderRadius: "7px",
                outline: "none",
              }}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value="">No Filters</option>
              <option value={"With Primary"}>With Primary</option>
              <option value={"No Primary"}>No Primary</option>
              <option value={"No Category"}>No Category</option>
              <option value={"No Colors"}>No Colors</option>
              <option value={"No Tags"}>No Tag</option>
              <option value={"Date Oldest"}>Date Oldest</option>
              <option value={"Date Latest"}>Date Latest</option>
              <option value={"Like Up"}>Like Up</option>
              <option value={"Like Down"}>Like Down</option>
              <option value={"Download Up"}>Download Up</option>
              <option value={"Download Down"}>Download Down</option>
              <option value={"Hide"}>Hidden</option>
              <option value={"Size Up"}>Size Up</option>
              <option value={"Size Down"}>Size Down</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-primary m-4 w-100"
          onClick={() => {
            updateCustomCategory(categoryID, wallpaperIds, visibility);
          }}
        >
          Update
        </button>
      </div>
    </>
  );
}

export default CustomCategoryUpdate;
