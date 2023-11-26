import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import ntc from "ntcjs";
import axiosInstance, {
  fetchTags,
  fetchWallpapers,
  fetchCategories,
  base,
  getTotalWallpapers,
  fetchColors,
  fetchWallpapersWithFilter,
  fetchHexColors,
} from "../../functions/functions.ts";
import Wheel from "@uiw/react-color-wheel";
import axios from "axios";
import FormData from "form-data";
import { TailSpin } from "react-loader-spinner";
import {
  successPopup,
  infoPopup,
  errorPopup,
} from "../../functions/popupMessages.js";

function WallpaperList() {
  const [totalWallpapers, setTotalWallpapers] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState("all");
  useEffect(() => {
    fetchTags(setTags);
    fetchCategories(setCategories);
  }, []);
  useEffect(() => {
    if (totalWallpapers.length === 0 && data.length !== 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    // console.log(totalWallpapers);
  }, [totalWallpapers]);

  const columns = [
    {
      name: "Tags",
    },
    {
      name: "Price",
    },
    {
      name: "Category Name",
    },
    {
      name: "Color Name",
    },
    {
      name: "Color Hex",
    },
    {
      name: "Model",
    },
    {
      name: "Thumbnail",
      selector: (row) => row.Thmbnl,
    },
    {
      name: "File",
      selector: (row) => row.file,
    },
    {
      name: "Created At",
    },
    {
      name: "Status",
    },
    {
      name: "Visibility",
    },
    {
      name: "Downloads",
    },
    {
      name: "Main Size",
    },
    {
      name: "Thumb Size",
    },
    {
      name: "Likes",
    },
  ];

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPageNumber, setNewPageNumber] = useState(1);
  const itemsPerPage = 50;
  const [filter, setFilter] = useState(localStorage.getItem("filter") || "");
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  useEffect(() => {
    localStorage.setItem("filter", filter);
    fetchWallpapersWithFilter(
      setTotalWallpapers,
      filter,
      1,
      100000000000,
      model
    );
    window.scrollTo(0, 0);
  }, [currentPage, filter, model]);

  const totalPages = Math.ceil(totalWallpapers.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
        ""
      )}
      {!loading ? (
        <>
          <div className="d-flex justify-content-between">
            <h4 className="w-50">Total wallpapers: {totalWallpapers.length}</h4>
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
                value={model}
              >
                <option value={"4D"}>4D</option>
                <option value={"4K"}>4K</option>
                <option value={"live"}>Live</option>
                <option value={"all"}>All</option>
              </select>
              <select
                defaultValue={"Date Latest"}
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
                value={filter}
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
          <div style={{ overflowX: "scroll" }} className="m-3">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  {columns.map((item, ind) => {
                    return (
                      <th key={ind} scope="col">
                        <div
                          style={{
                            width: "max-content",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {item.name}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {totalWallpapers.length > 0 &&
                  totalWallpapers
                    .slice(startIndex, endIndex)
                    .map((item, ind) => {
                      return (
                        <tr key={ind}>
                          <td>
                            <TagSelect tags={tags} item={item} />
                          </td>
                          <td>
                            {" "}
                            {/* <div className="table-input" key={ind}> */}
                            <input
                              placeholder={
                                Number(item?.price) !== 0 ? item.price : "N.A"
                              }
                              id={item._id}
                              disabled={item.paid !== "PAID" ? true : false}
                              style={{
                                width: "100px",
                                margin: "0.2rem",
                                padding: "0.3rem",
                                borderRadius: "4px",
                                outline: "none",
                                background:
                                  item.paid === "PAID"
                                    ? "rgba(112, 112, 112, 0.22)"
                                    : "none",
                                color: "rgb(131,131,131)",
                                boxShadow:
                                  item.paid !== "PAID"
                                    ? "none"
                                    : "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                transition: "box-shadow 0.3s ease-in-out",
                                // color: item.paid !== "PAID" ? "#ccc" : "#000",
                              }}
                              onChange={async (e) => {
                                const form = new FormData();
                                form.append("price", Number(e.target.value));
                                await axiosInstance({
                                  method: "post",
                                  url: `/api/wallpaper/update/${item._id}`,
                                  data: form,
                                  headers: {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                    },
                                  },
                                });
                              }}
                            />
                            {/* </div> */}
                          </td>
                          <td>
                            <SelectCategory
                              categories={categories}
                              item={item}
                            />
                          </td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                padding: "0.4rem 0.3rem",
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                borderRadius: "4px",
                                width: "100px",
                                textAlign: "center",
                              }}
                            >
                              <span
                                id={item._id + "_color"}
                                style={{
                                  color: item.color_hex
                                    ? item.color_hex
                                    : "rgb(131,131,131)",
                                  textAlign: "center",
                                }}
                              >
                                {item.color_code ? item.color_code : "N.A"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <SelectColorHex item={item} />
                          </td>
                          <td>{item.model}</td>
                          <td>
                            <div className="d-flex " key={ind}>
                              <a
                                href={`http://localhost:4000/${item?.thumbnail}`}
                                download={item?.thumbnail}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  className="thumbnail_Image"
                                  src={`http://localhost:4000/${item?.thumbnail}`}
                                  alt="Thumbnail"
                                  style={{
                                    height: "50px",
                                    width: "40px",
                                    objectFit: "cover",
                                    margin: "0px 5px",
                                    cursor: "pointer",
                                  }}
                                />
                              </a>

                              <span
                                onClick={(e) => {
                                  e.preventDefault();
                                  // handleDownload(item?.thumbnail);
                                }}
                              >
                                <i
                                  className="fa fa-download "
                                  aria-hidden="true"
                                  style={{
                                    color: "#0d6efd",
                                    cursor: "pointer",
                                  }}
                                ></i>
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex" key={ind}>
                              <img
                                style={{
                                  height: "50px",
                                  width: "40px",
                                  objectFit: "cover",
                                  margin: "0px 5px",
                                }}
                                alt="Thumbnail"
                                src="https://mobimg.b-cdn.net/v3/fetch/05/05eeb93a2e41734ecb6044146351f11e.jpeg"
                              />
                              <a href={item?.file} download>
                                <i
                                  className="fa fa-download "
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </td>
                          <td>
                            <div className="text-wrap">
                              {item?.time.split(" ")[0]}
                            </div>
                            <div>{item?.time.split(" ")[1]}</div>
                          </td>
                          <td>
                            <SingleSelect id={item._id} />
                          </td>
                          <td>
                            <SingleSelectVisibility id={item._id} />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item?.ttl_downld || "N.A."}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.main_size ? item.main_size : "N.A."}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.thumb_size ? item.thumb_size : "N.A."}
                          </td>
                          <td style={{ textAlign: "center" }}>{item?.likes}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
            {totalWallpapers.length === 0 && !loading && (
              <div className="w-100 m-auto text-center">
                <h1>NO DATA TO DISPLAY</h1>
              </div>
            )}
          </div>
          <div>
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              const showButton =
                page <= 5 ||
                (page > currentPage - 4 && page < currentPage + 4) ||
                page > totalPages - 5;

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
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
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
              value={model}
            >
              <option value={"4D"}>4D</option>
              <option value={"4K"}>4K</option>
              <option value={"live"}>Live</option>
              <option value={"all"}>All</option>
            </select>
            <select
              defaultValue={"Date Latest"}
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
              value={filter}
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
        </>
      ) : (
        ""
      )}
    </>
  );
}

const SingleSelect = ({ id }) => {
  const [isPaid, setIsPaid] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.post(`/api/wallpaper/list/${id}`);
      const data = response.data.wallpaper;
      setIsPaid(data.paid);
    };
    getData();
  }, []);

  const [paid, setPaid] = useState("FREE");
  const updateWallpaper = useCallback(
    async (_paid) => {
      try {
        // console.log(_paid);
        const form = new FormData();
        form.append("paid", _paid);
        await axiosInstance({
          method: "post",
          url: `/api/wallpaper/update/${id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
      } catch (err) {
        // console.log(err);
      }
    },
    [paid]
  );
  const handleSelect = (e) => {
    setPaid(e.target.value);
    updateWallpaper(e.target.value);
    if (paid !== "PAID") {
      document.getElementById(id).disabled = false;
      document.getElementById(id).style.background = "rgba(112,112,112,0.22)";
    } else {
      document.getElementById(id).value = 0;
      document.getElementById(id).disabled = true;
      document.getElementById(id).background = "none";
    }
  };

  return (
    <div id={id} style={{ width: 80 }}>
      <select
        onChange={handleSelect}
        style={{
          padding: "0.7rem 0.3rem",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          color: "rgb(131,131,131)",
          borderRadius: "4px",
          width: "100%",
        }}
      >
        <option value={"FREE"} selected={isPaid !== "PAID"}>
          Free
        </option>
        <option value={"PAID"} selected={isPaid === "PAID"}>
          Paid
        </option>
      </select>
    </div>
  );
};

const SingleSelectVisibility = ({ id }) => {
  const [hide, setHide] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.post(`/api/wallpaper/list/${id}`);
      const data = response.data.wallpaper;

      setHide(data.hide);
    };
    getData();
    // console.log(hide)
  }, []);

  const [hidden, setHidden] = useState("");
  const updateWallpaper = useCallback(
    async (_hide) => {
      try {
        // await axiosInstance.post(
        //   `/api/wallpaper/update/${id}`,
        //   {
        //     hide: _hide,
        //   },
        //   {
        //     headers: { "Content-Type": "multipart/form-data" },
        //   }
        // );

        const form = new FormData();
        form.append("hide", _hide);
        await axiosInstance({
          method: "post",
          url: `/api/wallpaper/update/${id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
      } catch (err) {
        // console.log(err);
      }
    },
    [hidden]
  );

  const handleSelect = (e) => {
    setHidden(e.target.value);
    // console.log(e.target.value)
    updateWallpaper(e.target.value);
  };
  // console.log(isPaid)
  return (
    <div id={id} style={{ width: 70 }}>
      <select
        onChange={handleSelect}
        style={{
          padding: "0.7rem 0.3rem",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "4px",
          width: "100%",
          color: "rgb(131,131,131)",
        }}
      >
        <option value={"Yes"} selected={hide === "Yes"}>
          No
        </option>
        <option value={"No"} selected={hide !== "Yes"}>
          Yes
        </option>
      </select>
    </div>
  );
};

const TagSelect = ({ tags, item }) => {
  const [prevTags, setPrevTags] = useState([]);
  const options = tags.map((item) => {
    return { label: item.tag, value: item._id };
  });

  useEffect(() => {
    setPrevTags(item.tag);
  }, []);
  const [newTags, setNewTags] = useState([]);
  const updateWallpaper = useCallback(async (_tags) => {
    try {
      const form = new FormData();
      form.append("tag", _tags);
      await axiosInstance({
        method: "post",
        url: `/api/wallpaper/update/${item._id}`,
        data: form,
        headers: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    } catch (err) {
      // console.log(err);
    }
  }, []);
  const handleSelect = (selectedList) => {
    const newTags = selectedList.map((item) => item.value);
    setNewTags(newTags);
    updateWallpaper(newTags);
  };

  return (
    <div style={{ width: "180px", border: "none" }}>
      <Select
        placeholder="Select Tags"
        defaultValue={prevTags}
        options={options}
        onChange={handleSelect}
        isMulti
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "rgb(0 0 0 / 0%)",
            color: "white",
            border: "1px solid rgba(0, 0, 0, 0.2)",
          }),
          option: (provided, state) => ({
            ...provided,
            display: "flex",
            alignItems: "center",
            padding: "0.7rem 0.5rem",
            position: "relative",
            backgroundColor: "white",
            color: "black",
          }),
        }}
      />
    </div>
  );
};

const SelectCategory = ({ categories, item }) => {
  const [cat_name, setCatName] = useState(null);
  const options = categories.map((option) => {
    return { label: option.cat_name, value: option._id };
  });

  useEffect(() => {
    setCatName(item.cat_name);
  }, [item.cat_name]);

  const updateWallpaper = useCallback(async (_cat_name) => {
    try {
      const form = new FormData();
      form.append("cat_name", _cat_name);
      await axiosInstance({
        method: "post",
        url: `/api/wallpaper/update/${item._id}`,
        data: form,
        headers: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    } catch (err) {
      // console.log(err);
    }
  }, []);

  const handleSelect = (selectedItem) => {
    setCatName(selectedItem);
    updateWallpaper(selectedItem);
  };

  return (
    <div id={item._id} style={{ width: "100%", border: "none", margin: "0" }}>
      {cat_name != null ? (
        <select
          value={cat_name}
          onChange={(e) => handleSelect(e.target.value)}
          style={{
            padding: "0.7rem 0.3rem",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderRadius: "4px",
            width: "180px",
            color: "rgb(131,131,131)",
          }}
        >
          {" "}
          <option key={""} value={"none"}>
            Select Category
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <select
          style={{
            padding: "0.7rem 0.3rem",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderRadius: "4px",
            width: "180px",
            color: "rgb(131,131,131)",
          }}
        >
          <option key={""} value={"none"}>
            Select Category
          </option>
        </select>
      )}
    </div>
  );
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: "0.1rem 0.1rem",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: "4px",
    width: "100%",
    color: "rgb(131,131,131)",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0.5rem",
    position: "relative",
    backgroundColor: "rgba(120, 120, 120, 0.68)",
    color: state.data.color,
    fontWeight: "bold",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
    fontWeight: "bold",
    fontSize: "1rem",
  }),
};

const SelectColor = ({ colors, id }) => {
  const [color_code, setColorCode] = useState("");
  const options = [
    { label: "No Color", color: "#fff", value: "none" }, // default option
    ...colors.map((item) => {
      return { label: item.name, color: item.hash_code, value: item.name };
    }),
  ];

  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.post(`/api/wallpaper/list/${id}`);
      const data = response.data.wallpaper;
      setColorCode(data.color_code);
    };
    getData();
  }, []);

  const updateWallpaper = useCallback(
    async (_color_code) => {
      try {
        const form = new FormData();
        form.append("color_code", _color_code);
        await axiosInstance({
          method: "post",
          url: `/api/wallpaper/update/${id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
      } catch (err) {
        // console.log(err);
      }
    },
    [color_code]
  );

  const handleSelect = (selectedOption) => {
    setColorCode(selectedOption.value);
    updateWallpaper(selectedOption.value);
  };

  return (
    <div id={id} style={{ width: "100%", border: "none" }}>
      <Select
        options={options}
        defaultValue={options.find((option) => option.value === color_code)}
        styles={customStyles}
        onChange={handleSelect}
      />
    </div>
  );
};

const SelectColorHex = ({ item }) => {
  const [opened, setOpened] = useState(false);
  const [displayMode, setDisplayMode] = useState("colorwheel");
  const [colorHex, setColorHex] = useState("#000000");
  const [colorName, setColorName] = useState("");
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [pickerVisible, setPickerVisible] = useState(false);
  const id = item._id;
  const hexToHsva = (hexColor, alpha = 1) => {
    // Convert hex to RGB
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);

    // Convert RGB to HSV
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let hue = 0;
    let saturation = 0;
    const value = max / 255;

    if (delta !== 0) {
      if (max === red) {
        hue = ((green - blue) / delta) % 6;
      } else if (max === green) {
        hue = (blue - red) / delta + 2;
      } else {
        hue = (red - green) / delta + 4;
      }
      saturation = delta / max;
    }

    hue = Math.round(hue * 60);
    saturation = Math.round(saturation * 100);
    const hsva = {
      h: hue,
      s: saturation,
      v: Math.round(value * 100),
      a: alpha,
    };
    return hsva;
  };
  useEffect(() => {
    if (item.color_hex) {
      const hsva = hexToHsva(item.color_hex);
      setColorHex(item.color_hex);
      setHsva(hsva);
    }
  }, []);

  const handleColorChange = (color) => {
    const hsva = color.hsva;
    setHsva(hsva);
    setColorHex(color.hex);
    const n_match = ntc.name(color.hex);
    let color_name = n_match[1];
    setColorName(color_name);
  };

  const handleOkClick = () => {
    updateWallpaper(colorHex);
    setPickerVisible(false);
  };

  const updateWallpaper = async (color_Hex) => {
    try {
      document.getElementById(id + "_color").innerHTML = `${colorName}`;
      document.getElementById(
        id + "_color"
      ).style.color = `${colorHex} !important`;
      const form = new FormData();
      form.append("color_hex", color_Hex);
      form.append("color_code", colorName);
      await axiosInstance({
        method: "post",
        url: `/api/wallpaper/update/${item._id}`,
        data: form,
        headers: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      // AddHexColor(colorHex);
      try {
        await axiosInstance.post(`/api/color/create`, {
          color_code: color_Hex,
        });
        successPopup("Color created successfully");
        await axiosInstance.post(`/api/color/list`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          infoPopup("Color already exists");
        } else {
          errorPopup("Failed to create color");
        }
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const colorButton = (
    <div
      className="d-flex"
      style={{
        width: "100%",
        alignItems: "center",
        marginLeft: "0.5rem",
        justifyContent: "space-between",
        color: "rgb(131,131,131)",
      }}
    >
      <div
        id={id + "_color_btn"}
        style={{
          width: "42px",
          height: "42px",
          margin: "4px",
          backgroundColor: colorHex,
          cursor: "pointer",
          borderRadius: "50%",
        }}
        onMouseEnter={() => {
          setPickerVisible(pickerVisible ? false : true);
        }}
      />
    </div>
  );
  const handleModeChange = (mode) => {
    setDisplayMode(mode);
    setPickerVisible(true);
  };

  const pickerMenu = (
    <div className="d-flex">
      <button
        className="btn btn-sm btn-primary m-2"
        onClick={() => handleModeChange("colorwheel")}
      >
        Color Wheel
      </button>
      <button
        className="btn btn-sm btn-primary m-2"
        onClick={() => handleModeChange("eyedropper")}
      >
        Eyedropper
      </button>
    </div>
  );
  return (
    <div
      id={item._id}
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "50%",
      }}
    >
      {colorButton}
      {pickerVisible && displayMode === "colorwheel" ? (
        <div
          style={{
            position: "absolute",
            marginLeft: "-1rem",
            background: "#181818E6",
            padding: "2rem",
            borderRadius: "30px",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onMouseLeave={() => {
            setPickerVisible(false);
          }}
        >
          {pickerMenu}
          <Wheel color={hsva} onChange={handleColorChange} />
          <button
            className="btn btn-primary btn-sm m-3"
            onClick={handleOkClick}
            style={{ width: "80%" }}
          >
            OK
          </button>
        </div>
      ) : (
        ""
      )}
      {pickerVisible && displayMode === "eyedropper" ? (
        <>
          <div
            style={{
              position: "absolute",
              marginLeft: "-1rem",
              background: "#181818E6",
              padding: "2rem",
              borderRadius: "30px",
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onMouseLeave={() => {
              if (!opened) {
                setPickerVisible(false);
              }
            }}
          >
            {pickerMenu}
            <input
              type="color"
              id="selectcolorinput"
              value={colorHex}
              onChange={(e) => {
                const hexColor = e.target.value;
                const hsva = hexToHsva(hexColor);
                setColorHex(hexColor);
                setHsva(hsva);
              }}
              onClick={() => {
                setOpened(opened ? false : true);
              }}
              style={{ width: "80%", height: "2rem", margin: "1rem" }}
            />
            <button
              className="btn btn-primary btn-sm m-3"
              onClick={() => {
                handleOkClick();
                setPickerVisible(false);
                setOpened(false);
              }}
              style={{ width: "80%" }}
            >
              OK
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default WallpaperList;
